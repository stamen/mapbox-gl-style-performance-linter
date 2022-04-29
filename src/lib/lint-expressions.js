import { lintSingleMatchExpressions } from './expressions/single-match';

const lintExpressions = style => {
  let warnings = [];
  warnings = warnings.concat(lintSingleMatchExpressions(style));
  return warnings;
};

export { lintExpressions };
