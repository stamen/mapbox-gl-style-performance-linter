import { lintExpressions } from './lint-expressions';

const lint = style => {
  let warnings = [];
  warnings = warnings.concat(lintExpressions(style));
  return warnings;
};

export default lint;
