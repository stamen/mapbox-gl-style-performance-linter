import { createRecurseStyle } from 'mapbox-gl-style-recurse';

/**
 * lintSingleMatchExpressions
 * Returns warnings for single match expressions in a Mapbox stylesheet
 * @param {Object} style - Mapbox stylesheet
 * @returns {Array} - warnings for singular match expressions
 */
const lintSingleMatchExpressions = style => {
  let warnings = [];

  // This function runs inside the style expressions to find single matches and populate the warnings array
  const lintSingleMatch = (layerId, matchExp, key) => {
    let inputs = [];
    const outputs = [];
    let inputOutputs = matchExp.slice(2);
    const fallback = inputOutputs.pop();
    inputOutputs.forEach((val, i) =>
      i % 2 !== 0 ? outputs.push(val) : inputs.push(val)
    );
    outputs.push(fallback);
    inputs = inputs.flat(1);

    const isSingleInput = inputs.length === 1;
    const isAppropriateOutputs =
      outputs.length === 2 && outputs.includes(true) && outputs.includes(false);

    if (isSingleInput && isAppropriateOutputs) {
      warnings.push(
        `${layerId}: ${key} contains single match expression ${JSON.stringify(
          matchExp
        )}`
      );
    }
    // We return the existing match expression as-is because createRecurseStyle
    // can also be used to transform a stylesheet, but we only want to use it to warn
    return matchExp;
  };

  const isMatch = exp => !!(Array.isArray(exp) && exp[0] === 'match');

  const lintSingleMatches = createRecurseStyle({
    transformFn: lintSingleMatch,
    transformCondition: isMatch
  });

  lintSingleMatches(style);
  return warnings;
};

export { lintSingleMatchExpressions };
