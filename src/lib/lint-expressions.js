import { lintSingleMatchExpressions } from './expressions/single-match';

let warnings = [];

const lintExpressions = style => {
  warnings = warnings.concat(lintSingleMatchExpressions(style));
  return warnings;
};

export { lintExpressions };
