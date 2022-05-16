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

  let stringifiedOutputs = outputs.map(item => JSON.stringify(item));
  const dedupedOutputs = [...new Set(stringifiedOutputs)];

  for (const output of dedupedOutputs) {
    const index = stringifiedOutputs.findIndex(o => o === output);
    stringifiedOutputs.splice(index, 1);
  }

  let duplicateOutputs = [...new Set(stringifiedOutputs)].map(o =>
    JSON.parse(o)
  );

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
