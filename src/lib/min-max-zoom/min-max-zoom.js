import { createRecurseStyle } from 'mapbox-gl-style-recurse';
import { expression } from '@mapbox/mapbox-gl-style-spec';
const { isExpression } = expression;

const isScaleExpression = exp => {
  if (!isExpression(exp)) return false;
  const expressionsWithOutputs = [
    'interpolate',
    'interpolate-hcl',
    'interpolate-lab',
    'step'
  ];
  const flatExpression = exp.flat(Infinity);
  return flatExpression.some(item => expressionsWithOutputs.includes(item));
};

export const getInputOutputPairs = value => {
  const expressionType = value[0];
  let inputOutputs = [];
  let zooms = expressionType === 'step' ? [0] : [];
  let outputs = [];
  switch (expressionType) {
    case 'interpolate':
    case 'interpolate-hcl':
    case 'interpolate-lab': {
      inputOutputs = value.slice(3);
      inputOutputs.forEach((val, i) =>
        i % 2 === 0 ? zooms.push(val) : outputs.push(val)
      );
      break;
    }
    case 'step': {
      inputOutputs = value.slice(2);
      inputOutputs.forEach((val, i) =>
        i % 2 !== 0 ? zooms.push(val) : outputs.push(val)
      );
      break;
    }
  }
  const inputOutputPairs = zooms.reduce(
    (acc, z, i) => ({ ...acc, [z]: outputs[i] }),
    {}
  );
  return { expressionType, inputOutputPairs };
};

/**
 * getExtraneousMinMaxZoom
 * Returns warnings for expressions with redundant min and max zooms in a Mapbox stylesheet
 * @param {Object} style - Mapbox stylesheet
 * @returns {Array} - warnings for min/max zoom
 */
const getExtraneousMinMaxZoom = style => {
  let warnings = [];

  // This function runs inside the style expressions to find extraneous min and max zooms and populate the warnings array
  const lint = (layerId, expression, key) => {
    let { minzoom, maxzoom } = style.layers.find(l => l.id === layerId);
    minzoom = Number(minzoom);
    maxzoom = Number(maxzoom);

    let { expressionType, inputOutputPairs } = getInputOutputPairs(expression);
    let zooms =
      expressionType === 'step'
        ? Object.keys(inputOutputPairs).slice(1)
        : Object.keys(inputOutputPairs);
    zooms = zooms.map(Number);

    // Check that opacity of 0 doesn't make min/max zoom redundant
    if (key.includes('opacity')) {
      const pairEntries = Object.entries(inputOutputPairs).map(([k, v]) => [
        Number(k),
        Number(v)
      ]);

      // Handle minzoom
      if (minzoom) {
        const zeroOutput = pairEntries.filter(([k, v]) => v === 0)[0];

        const outputsBelowMinzoom = pairEntries.filter(
          ([k, v]) => k < minzoom && v === 0
        );

        let unnecessaryPairs = outputsBelowMinzoom.filter(([k, v]) => v !== 0);

        // Special handling for minzoom on step expression with unspecified first zoom
        if (
          expressionType === 'step' &&
          zeroOutput[0] === 0 &&
          zeroOutput[0] < minzoom
        ) {
          unnecessaryPairs.push(zeroOutput);
        }
        if (!zooms.some(z => z < zeroOutput[0]) && zeroOutput[0] > minzoom) {
          unnecessaryPairs.push(zeroOutput);
        }

        for (const pair of unnecessaryPairs) {
          warnings.push(
            `${layerId}: ${key} is at zero opacity before the minzoom - ${pair[1]} opacity at zoom ${pair[0]}`
          );
        }
      }

      // Handle maxzoom
      if (maxzoom) {
        const zeroOutput = pairEntries.filter(([k, v]) => v === 0).pop();

        const outputsAboveMaxzoom = pairEntries.filter(
          ([k, v]) => k > maxzoom && v === 0
        );

        let unnecessaryPairs = outputsAboveMaxzoom.filter(([k, v]) => v !== 0);

        if (!zooms.some(z => z > zeroOutput[0]) && zeroOutput[0] < maxzoom) {
          unnecessaryPairs.push(zeroOutput);
        }

        for (const pair of unnecessaryPairs) {
          warnings.push(
            `${layerId}: ${key} is at zero opacity before the maxzoom - ${pair[1]} opacity at zoom ${pair[0]}`
          );
        }
      }
    }

    return expression;
  };

  const lintMinMaxZooms = createRecurseStyle({
    transformFn: lint,
    transformCondition: isScaleExpression
  });

  lintMinMaxZooms(style);

  // Less complex so just cycle through layers
  for (const layer of style.layers) {
    let { minzoom, maxzoom } = layer;
    minzoom = Number(minzoom);
    maxzoom = Number(maxzoom);
    if (minzoom <= 0) {
      warnings.push(`${layer.id}: contains unnecessary minzoom`);
    }
    if (maxzoom >= 24) {
      warnings.push(`${layer.id}: contains unnecessary maxzoom`);
    }
  }

  return warnings;
};

export { getExtraneousMinMaxZoom };
