import { createRecurseStyle } from 'mapbox-gl-style-recurse';

let warnings = [];

/**
 * lintSingleMatch
 * Checks if a match expression has a single input and outputs true, false
 * @param {Array} matchExp - match expression
 * @returns {Array} - either the same match expression or more performant "==" expression
 */
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

  return matchExp;
};

/**
 * replaceSingleMatchCondition
 * Condition to run single match linter on
 * @param {Array} exp - expression
 * @returns {boolean} - true or false
 */
const singleMatchCondition = exp => {
  return !!(Array.isArray(exp) && exp[0] === 'match');
};

const lintSingleMatchExpressions = style => {
  const lintSingleMatches = createRecurseStyle({
    transformFn: lintSingleMatch,
    transformCondition: singleMatchCondition
  });
  lintSingleMatches(style);
  return warnings;
};

export { lintSingleMatchExpressions };
