import { lintSingleMatchExpressions } from './expressions/single-match';
import { lintExpressionDuplicateOutputs } from './expressions/duplicate-output';

const lintExpressions = style => {
  let warnings = [];
  warnings = warnings.concat(lintSingleMatchExpressions(style));
  warnings = warnings.concat(lintExpressionDuplicateOutputs(style));
  return warnings;
};

export { lintExpressions };
