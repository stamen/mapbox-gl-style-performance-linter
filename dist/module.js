import {createRecurseStyle as $5OpyM$createRecurseStyle} from "mapbox-gl-style-recurse";
import {expression as $5OpyM$expression} from "@mapbox/mapbox-gl-style-spec";

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

var $6NtmY = parcelRequire("6NtmY");
var $1a7d8d8e3eafced6$var$lintExpressions = function lintExpressions(style) {
    var warnings = [];
    warnings = warnings.concat((0, $hJZsQ.lintSingleMatchExpressions)(style));
    warnings = warnings.concat((0, $6NtmY.lintExpressionDuplicateOutputs)(style));
    return warnings;
};
module.exports.lintExpressions = $1a7d8d8e3eafced6$var$lintExpressions;

});
parcelRequire.register("hJZsQ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.lintSingleMatchExpressions = void 0;

/**
 * lintSingleMatchExpressions
 * Returns warnings for single match expressions in a Mapbox stylesheet
 * @param {Object} style - Mapbox stylesheet
 * @returns {Array} - warnings for singular match expressions
 */ var $cea651254e30c771$var$lintSingleMatchExpressions = function lintSingleMatchExpressions(style) {
    var warnings = []; // This function runs inside the style expressions to find single matches and populate the warnings array
    var lintSingleMatch = function lintSingleMatch(layerId, matchExp, key) {
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
        if (isSingleInput && isAppropriateOutputs) warnings.push("".concat(layerId, ": ").concat(key, " contains single match expression ").concat(JSON.stringify(matchExp)));
         // We return the existing match expression as-is because createRecurseStyle
        // can also be used to transform a stylesheet, but we only want to use it to warn
        return matchExp;
    };
    var isMatch = function isMatch(exp) {
        return !!(Array.isArray(exp) && exp[0] === 'match');
    };
    var lintSingleMatches = (0, $5OpyM$createRecurseStyle)({
        transformFn: lintSingleMatch,
        transformCondition: isMatch
    });
    lintSingleMatches(style);
    return warnings;
};
module.exports.lintSingleMatchExpressions = $cea651254e30c771$var$lintSingleMatchExpressions;

});

parcelRequire.register("6NtmY", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.lintExpressionDuplicateOutputs = module.exports.getDuplicateOutputs = void 0;


function $4f2e19d78d9fcd75$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $4f2e19d78d9fcd75$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function $4f2e19d78d9fcd75$var$_toConsumableArray(arr) {
    return $4f2e19d78d9fcd75$var$_arrayWithoutHoles(arr) || $4f2e19d78d9fcd75$var$_iterableToArray(arr) || $4f2e19d78d9fcd75$var$_unsupportedIterableToArray(arr) || $4f2e19d78d9fcd75$var$_nonIterableSpread();
}
function $4f2e19d78d9fcd75$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $4f2e19d78d9fcd75$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $4f2e19d78d9fcd75$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $4f2e19d78d9fcd75$var$_arrayLikeToArray(o, minLen);
}
function $4f2e19d78d9fcd75$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $4f2e19d78d9fcd75$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $4f2e19d78d9fcd75$var$_arrayLikeToArray(arr);
}
function $4f2e19d78d9fcd75$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
var $4f2e19d78d9fcd75$var$isExpression = $5OpyM$expression.isExpression;
var $4f2e19d78d9fcd75$var$hasOutputs = function hasOutputs(exp) {
    if (!$4f2e19d78d9fcd75$var$isExpression(exp)) return false;
    var expressionsWithOutputs = [
        'interpolate',
        'interpolate-hcl',
        'interpolate-lab',
        'step',
        'match',
        'case'
    ];
    var flatExpression = exp.flat(Infinity);
    return flatExpression.some(function(item) {
        return expressionsWithOutputs.includes(item);
    });
};
var $4f2e19d78d9fcd75$var$getDuplicateOutputs = function getDuplicateOutputs(value) {
    var expressionType = value[0];
    var inputOutputs = [];
    var outputs = [];
    switch(expressionType){
        case 'interpolate':
        case 'interpolate-hcl':
        case 'interpolate-lab':
            inputOutputs = value.slice(3);
            inputOutputs.forEach(function(val, i) {
                return i % 2 !== 0 && outputs.push(val);
            });
            break;
        case 'step':
            inputOutputs = value.slice(2);
            inputOutputs.forEach(function(val, i) {
                return i % 2 === 0 && outputs.push(val);
            });
            break;
        case 'case':
            inputOutputs = value.slice(1);
            var fallback = inputOutputs.pop();
            inputOutputs.forEach(function(val, i) {
                return i % 2 !== 0 && outputs.push(val);
            });
            outputs.push(fallback);
            break;
        case 'match':
            inputOutputs = value.slice(2);
            var _fallback = inputOutputs.pop();
            inputOutputs.forEach(function(val, i) {
                return i % 2 !== 0 && outputs.push(val);
            });
            outputs.push(_fallback);
            break;
    }
    var stringifiedOutputs = outputs.map(function(item) {
        return JSON.stringify(item);
    });
    var dedupedOutputs = $4f2e19d78d9fcd75$var$_toConsumableArray(new Set(stringifiedOutputs));
    var _iterator = $4f2e19d78d9fcd75$var$_createForOfIteratorHelper(dedupedOutputs), _step;
    try {
        var _loop = function _loop() {
            var output = _step.value;
            var index = stringifiedOutputs.findIndex(function(o) {
                return o === output;
            });
            stringifiedOutputs.splice(index, 1);
        };
        for(_iterator.s(); !(_step = _iterator.n()).done;)_loop();
    } catch (err) {
        _iterator.e(err);
    } finally{
        _iterator.f();
    }
    var duplicateOutputs = $4f2e19d78d9fcd75$var$_toConsumableArray(new Set(stringifiedOutputs)).map(function(o) {
        return JSON.parse(o);
    });
    var nestedOutputs = outputs.filter(function(o) {
        return $4f2e19d78d9fcd75$var$hasOutputs(o);
    });
    if (nestedOutputs.length) {
        var nestedDuplicates = nestedOutputs.reduce(function(acc, o) {
            return acc.concat(getDuplicateOutputs(o));
        }, []);
        duplicateOutputs = duplicateOutputs.concat(nestedDuplicates);
    }
    return duplicateOutputs;
};
/**
 * lintExpressionDuplicateOutputs
 * Returns warnings for expressions with redundant outputs in a Mapbox stylesheet
 * @param {Object} style - Mapbox stylesheet
 * @returns {Array} - warnings for singular match expressions
 */ module.exports.getDuplicateOutputs = $4f2e19d78d9fcd75$var$getDuplicateOutputs;
var $4f2e19d78d9fcd75$var$lintExpressionDuplicateOutputs = function lintExpressionDuplicateOutputs(style) {
    var warnings = []; // This function runs inside the style expressions to find single matches and populate the warnings array
    var lintOutputs = function lintOutputs(layerId, expression, key) {
        var duplicates = $4f2e19d78d9fcd75$var$getDuplicateOutputs(expression).map(function(item) {
            return Array.isArray(item) ? JSON.stringify(item) : item;
        });
        if (duplicates.length) warnings.push("".concat(layerId, ": ").concat(key, " contains duplicate outputs - ").concat(duplicates.join(', ')));
        return expression;
    };
    var lintDuplicateOutputs = (0, $5OpyM$createRecurseStyle)({
        transformFn: lintOutputs,
        transformCondition: $4f2e19d78d9fcd75$var$hasOutputs
    });
    lintDuplicateOutputs(style);
    return warnings;
};
module.exports.lintExpressionDuplicateOutputs = $4f2e19d78d9fcd75$var$lintExpressionDuplicateOutputs;

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
