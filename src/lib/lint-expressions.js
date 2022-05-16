import { lintSingleMatchExpressions } from './expressions/single-match';

const lintExpressions = style => {
  let warnings = [];
  warnings = warnings.concat(lintSingleMatchExpressions(style));
  warnings = warnings.concat(lintExpressionDuplicateOutputs(style));
  return warnings;
};

export { lintExpressions };
