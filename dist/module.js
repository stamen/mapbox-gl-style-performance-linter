import {createRecurseStyle as $5OpyM$createRecurseStyle} from "mapbox-gl-style-recurse";

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire77b4"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire77b4"] = parcelRequire;
}
parcelRequire.register("5OAEr", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $2h0uJ = parcelRequire("2h0uJ");
var $43be0d73ed34991b$var$lint = function lint(style) {
    var warnings = [];
    warnings = warnings.concat((0, $2h0uJ.lintExpressions)(style));
    return warnings;
};
var $43be0d73ed34991b$var$_default = $43be0d73ed34991b$var$lint;
module.exports["default"] = $43be0d73ed34991b$var$_default;

});
parcelRequire.register("2h0uJ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.lintExpressions = void 0;

var $hJZsQ = parcelRequire("hJZsQ");
var $1a7d8d8e3eafced6$var$warnings = [];
var $1a7d8d8e3eafced6$var$lintExpressions = function lintExpressions(style) {
    $1a7d8d8e3eafced6$var$warnings = $1a7d8d8e3eafced6$var$warnings.concat((0, $hJZsQ.lintSingleMatchExpressions)(style));
    return $1a7d8d8e3eafced6$var$warnings;
};
module.exports.lintExpressions = $1a7d8d8e3eafced6$var$lintExpressions;

});
parcelRequire.register("hJZsQ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.lintSingleMatchExpressions = void 0;

var $cea651254e30c771$var$warnings = [];
/**
 * lintSingleMatch
 * Checks if a match expression has a single input and outputs true, false
 * @param {Array} matchExp - match expression
 * @returns {Array} - either the same match expression or more performant "==" expression
 */ var $cea651254e30c771$var$lintSingleMatch = function lintSingleMatch(layerId, matchExp, key) {
    var inputs = [];
    var outputs = [];
    var inputOutputs = matchExp.slice(2);
    var fallback = inputOutputs.pop();
    inputOutputs.forEach(function(val, i) {
        return i % 2 !== 0 ? outputs.push(val) : inputs.push(val);
    });
    outputs.push(fallback);
    inputs = inputs.flat(1);
    var isSingleInput = inputs.length === 1;
    var isAppropriateOutputs = outputs.length === 2 && outputs.includes(true) && outputs.includes(false);
    if (isSingleInput && isAppropriateOutputs) $cea651254e30c771$var$warnings.push("".concat(layerId, ": ").concat(key, " contains single match expression ").concat(JSON.stringify(matchExp)));
    return matchExp;
};
/**
 * replaceSingleMatchCondition
 * Condition to run single match linter on
 * @param {Array} exp - expression
 * @returns {boolean} - true or false
 */ var $cea651254e30c771$var$singleMatchCondition = function singleMatchCondition(exp) {
    return !!(Array.isArray(exp) && exp[0] === 'match');
};
var $cea651254e30c771$var$lintSingleMatchExpressions = function lintSingleMatchExpressions(style) {
    var lintSingleMatches = (0, $5OpyM$createRecurseStyle)({
        transformFn: $cea651254e30c771$var$lintSingleMatch,
        transformCondition: $cea651254e30c771$var$singleMatchCondition
    });
    lintSingleMatches(style);
    return $cea651254e30c771$var$warnings;
};
module.exports.lintSingleMatchExpressions = $cea651254e30c771$var$lintSingleMatchExpressions;

});



var $cf838c15c8b009ba$exports = {};
"use strict";
Object.defineProperty($cf838c15c8b009ba$exports, "__esModule", {
    value: true
});
Object.defineProperty($cf838c15c8b009ba$exports, "lint", {
    enumerable: true,
    get: function get() {
        return $cf838c15c8b009ba$var$_lint["default"];
    }
});

var $cf838c15c8b009ba$var$_lint = $cf838c15c8b009ba$var$_interopRequireDefault((parcelRequire("5OAEr")));
function $cf838c15c8b009ba$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}


export {$cf838c15c8b009ba$exports as default};
//# sourceMappingURL=module.js.map
