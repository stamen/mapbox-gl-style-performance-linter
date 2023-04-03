import { lintExpressions } from './lint-expressions';
import { getExtraneousMinMaxZoom } from './min-max-zoom/min-max-zoom';

const lint = style => {
  let warnings = [];
  warnings = warnings.concat(lintExpressions(style));
  warnings = warnings.concat(getExtraneousMinMaxZoom(style));
  return warnings;
};

export default lint;
