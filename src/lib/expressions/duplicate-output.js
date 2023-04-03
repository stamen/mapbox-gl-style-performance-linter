import { createRecurseStyle } from 'mapbox-gl-style-recurse';
import { expression } from '@mapbox/mapbox-gl-style-spec';
const { isExpression } = expression;

const hasOutputs = exp => {
  if (!isExpression(exp)) return false;
  const expressionsWithOutputs = [
    'interpolate',
    'interpolate-hcl',
    'interpolate-lab',
    'step',
    'match',
    'case'
  ];
  const flatExpression = exp.flat(Infinity);
  return flatExpression.some(item => expressionsWithOutputs.includes(item));
};

// Takes an array of indices and returns as an array of arrays containing the indices when they are in sequence
// For example, [1, 2, 3, 5] returns [[1, 2, 3], [5]] because 4 is skipped
export const getSequentialIndexArrays = arr => {
  if (!arr.every(item => typeof item === 'number')) {
    console.error('Array is not made of index numbers');
    return arr;
  }
  let next = [];

  arr.forEach((index, i) => {
    if (next.some(arr => arr.includes(index))) return;
    let sequence = [];
    let value = index;
    let checkIndex = i;
    do {
      sequence.push(value);
      checkIndex = checkIndex + 1;
      value = arr[checkIndex];
    } while (value === arr[checkIndex - 1] + 1);
    next.push(sequence);
  });

  return next;
};

export const getDuplicateOutputs = value => {
  const expressionType = value[0];
  let inputOutputs = [];
  let outputs = [];

  switch (expressionType) {
    case 'interpolate':
    case 'interpolate-hcl':
    case 'interpolate-lab': {
      inputOutputs = value.slice(3);
      inputOutputs.forEach((val, i) => i % 2 !== 0 && outputs.push(val));
      break;
    }
    case 'step': {
      inputOutputs = value.slice(2);
      inputOutputs.forEach((val, i) => i % 2 === 0 && outputs.push(val));
      break;
    }
    case 'case': {
      inputOutputs = value.slice(1);
      const fallback = inputOutputs.pop();
      inputOutputs.forEach((val, i) => i % 2 !== 0 && outputs.push(val));
      outputs.push(fallback);
      break;
    }
    case 'match': {
      inputOutputs = value.slice(2);
      const fallback = inputOutputs.pop();
      inputOutputs.forEach((val, i) => i % 2 !== 0 && outputs.push(val));
      outputs.push(fallback);
      break;
    }
  }

  const stringifiedOutputs = outputs.map(item => JSON.stringify(item));

  const isScale = expressionType === 'interpolate' || expressionType === 'step';

  let duplicateOutputs = new Set();

  // Create arrays for all the indices outputs appear at
  let outputIndexes = stringifiedOutputs.reduce((acc, o, i) => {
    if (acc[o]) {
      acc[o].push(i);
    } else {
      acc[o] = [i];
    }
    return acc;
  }, {});

  // Based on whether or not it is a scale expression, return whether we have invalid duplicates
  // For scales, invalid duplicates include:
  // - two identical outputs at the beginning of expression
  // - two identical outputs at the end of expression
  // - three identical outputs anywhere in an expression
  // For conditionals, invalid duplicates include:
  // - two identical outputs anywhere in the expression
  Object.entries(outputIndexes).forEach(pair => {
    const [k, v] = pair;

    if (isScale) {
      let sequences = getSequentialIndexArrays(v);
      const firstIndex = 0;
      const lastIndex = outputs.length - 1;
      let beginning = sequences[0] || [];
      let end = sequences[sequences.length - 1];
      if (!beginning.includes(firstIndex)) beginning = [];
      if (!end.includes(lastIndex)) end = [];

      if (
        beginning.length >= 2 ||
        end.length >= 2 ||
        sequences.some(arr => arr.length >= 3)
      ) {
        duplicateOutputs.add(k);
      }
    } else {
      if (v.length > 1) duplicateOutputs.add(k);
    }
  });

  duplicateOutputs = [...duplicateOutputs].map(d => JSON.parse(d));

  const nestedOutputs = outputs.filter(o => hasOutputs(o));

  if (nestedOutputs.length) {
    const nestedDuplicates = nestedOutputs.reduce(
      (acc, o) => acc.concat(getDuplicateOutputs(o)),
      []
    );
    duplicateOutputs = duplicateOutputs.concat(nestedDuplicates);
  }

  return duplicateOutputs;
};

/**
 * lintExpressionDuplicateOutputs
 * Returns warnings for expressions with redundant outputs in a Mapbox stylesheet
 * @param {Object} style - Mapbox stylesheet
 * @returns {Array} - warnings for singular match expressions
 */
const lintExpressionDuplicateOutputs = style => {
  let warnings = [];

  // This function runs inside the style expressions to find single matches and populate the warnings array
  const lintOutputs = (layerId, expression, key) => {
    const duplicates = getDuplicateOutputs(expression).map(item =>
      Array.isArray(item) ? JSON.stringify(item) : item
    );
    if (duplicates.length) {
      warnings.push(
        `${layerId}: ${key} contains duplicate outputs - ${duplicates.join(
          ', '
        )}`
      );
    }
    return expression;
  };

  const lintDuplicateOutputs = createRecurseStyle({
    transformFn: lintOutputs,
    transformCondition: hasOutputs
  });

  lintDuplicateOutputs(style);
  return warnings;
};

export { lintExpressionDuplicateOutputs };
