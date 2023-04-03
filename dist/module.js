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

var $eS0CI = parcelRequire("eS0CI");
var $43be0d73ed34991b$var$lint = function lint(style) {
    var warnings = [];
    warnings = warnings.concat((0, $2h0uJ.lintExpressions)(style));
    warnings = warnings.concat((0, $eS0CI.getExtraneousMinMaxZoom)(style));
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
        return !!(Array.isArray(exp) && exp[0] === "match");
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
module.exports.lintExpressionDuplicateOutputs = module.exports.getSequentialIndexArrays = module.exports.getDuplicateOutputs = void 0;


function $4f2e19d78d9fcd75$var$_toConsumableArray(arr) {
    return $4f2e19d78d9fcd75$var$_arrayWithoutHoles(arr) || $4f2e19d78d9fcd75$var$_iterableToArray(arr) || $4f2e19d78d9fcd75$var$_unsupportedIterableToArray(arr) || $4f2e19d78d9fcd75$var$_nonIterableSpread();
}
function $4f2e19d78d9fcd75$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $4f2e19d78d9fcd75$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $4f2e19d78d9fcd75$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $4f2e19d78d9fcd75$var$_arrayLikeToArray(arr);
}
function $4f2e19d78d9fcd75$var$_slicedToArray(arr, i) {
    return $4f2e19d78d9fcd75$var$_arrayWithHoles(arr) || $4f2e19d78d9fcd75$var$_iterableToArrayLimit(arr, i) || $4f2e19d78d9fcd75$var$_unsupportedIterableToArray(arr, i) || $4f2e19d78d9fcd75$var$_nonIterableRest();
}
function $4f2e19d78d9fcd75$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $4f2e19d78d9fcd75$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $4f2e19d78d9fcd75$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $4f2e19d78d9fcd75$var$_arrayLikeToArray(o, minLen);
}
function $4f2e19d78d9fcd75$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $4f2e19d78d9fcd75$var$_iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $4f2e19d78d9fcd75$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
var $4f2e19d78d9fcd75$var$isExpression = $5OpyM$expression.isExpression;
var $4f2e19d78d9fcd75$var$hasOutputs = function hasOutputs(exp) {
    if (!$4f2e19d78d9fcd75$var$isExpression(exp)) return false;
    var expressionsWithOutputs = [
        "interpolate",
        "interpolate-hcl",
        "interpolate-lab",
        "step",
        "match",
        "case"
    ];
    var flatExpression = exp.flat(Infinity);
    return flatExpression.some(function(item) {
        return expressionsWithOutputs.includes(item);
    });
}; // Takes an array of indices and returns as an array of arrays containing the indices when they are in sequence
// For example, [1, 2, 3, 5] returns [[1, 2, 3], [5]] because 4 is skipped
var $4f2e19d78d9fcd75$var$getSequentialIndexArrays = function getSequentialIndexArrays(arr1) {
    if (!arr1.every(function(item) {
        return typeof item === "number";
    })) {
        console.error("Array is not made of index numbers");
        return arr1;
    }
    var next = [];
    arr1.forEach(function(index, i) {
        if (next.some(function(arr) {
            return arr.includes(index);
        })) return;
        var sequence = [];
        var value = index;
        var checkIndex = i;
        do {
            sequence.push(value);
            checkIndex = checkIndex + 1;
            value = arr1[checkIndex];
        }while (value === arr1[checkIndex - 1] + 1);
        next.push(sequence);
    });
    return next;
};
module.exports.getSequentialIndexArrays = $4f2e19d78d9fcd75$var$getSequentialIndexArrays;
var $4f2e19d78d9fcd75$var$getDuplicateOutputs = function getDuplicateOutputs1(value) {
    var expressionType = value[0];
    var inputOutputs = [];
    var outputs = [];
    switch(expressionType){
        case "interpolate":
        case "interpolate-hcl":
        case "interpolate-lab":
            inputOutputs = value.slice(3);
            inputOutputs.forEach(function(val, i) {
                return i % 2 !== 0 && outputs.push(val);
            });
            break;
        case "step":
            inputOutputs = value.slice(2);
            inputOutputs.forEach(function(val, i) {
                return i % 2 === 0 && outputs.push(val);
            });
            break;
        case "case":
            inputOutputs = value.slice(1);
            var fallback = inputOutputs.pop();
            inputOutputs.forEach(function(val, i) {
                return i % 2 !== 0 && outputs.push(val);
            });
            outputs.push(fallback);
            break;
        case "match":
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
    var isScale = expressionType === "interpolate" || expressionType === "step";
    var duplicateOutputs = new Set(); // Create arrays for all the indices outputs appear at
    var outputIndexes = stringifiedOutputs.reduce(function(acc, o, i) {
        if (acc[o]) acc[o].push(i);
        else acc[o] = [
            i
        ];
        return acc;
    }, {}); // Based on whether or not it is a scale expression, return whether we have invalid duplicates
    // For scales, invalid duplicates include:
    // - two identical outputs at the beginning of expression
    // - two identical outputs at the end of expression
    // - three identical outputs anywhere in an expression
    // For conditionals, invalid duplicates include:
    // - two identical outputs anywhere in the expression
    Object.entries(outputIndexes).forEach(function(pair) {
        var _pair = $4f2e19d78d9fcd75$var$_slicedToArray(pair, 2), k = _pair[0], v = _pair[1];
        if (isScale) {
            var sequences = $4f2e19d78d9fcd75$var$getSequentialIndexArrays(v);
            var firstIndex = 0;
            var lastIndex = outputs.length - 1;
            var beginning = sequences[0] || [];
            var end = sequences[sequences.length - 1];
            if (!beginning.includes(firstIndex)) beginning = [];
            if (!end.includes(lastIndex)) end = [];
            if (beginning.length >= 2 || end.length >= 2 || sequences.some(function(arr) {
                return arr.length >= 3;
            })) duplicateOutputs.add(k);
        } else if (v.length > 1) duplicateOutputs.add(k);
    });
    duplicateOutputs = $4f2e19d78d9fcd75$var$_toConsumableArray(duplicateOutputs).map(function(d) {
        return JSON.parse(d);
    });
    var nestedOutputs = outputs.filter(function(o) {
        return $4f2e19d78d9fcd75$var$hasOutputs(o);
    });
    if (nestedOutputs.length) {
        var nestedDuplicates = nestedOutputs.reduce(function(acc, o) {
            return acc.concat(getDuplicateOutputs1(o));
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
        if (duplicates.length) warnings.push("".concat(layerId, ": ").concat(key, " contains duplicate outputs - ").concat(duplicates.join(", ")));
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


parcelRequire.register("eS0CI", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getInputOutputPairs = module.exports.getExtraneousMinMaxZoom = void 0;


function $ad3697a0187dfb58$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $ad3697a0187dfb58$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
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
                e: function e(_e2) {
                    throw _e2;
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
        e: function e(_e3) {
            didErr = true;
            err = _e3;
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
function $ad3697a0187dfb58$var$_slicedToArray(arr, i) {
    return $ad3697a0187dfb58$var$_arrayWithHoles(arr) || $ad3697a0187dfb58$var$_iterableToArrayLimit(arr, i) || $ad3697a0187dfb58$var$_unsupportedIterableToArray(arr, i) || $ad3697a0187dfb58$var$_nonIterableRest();
}
function $ad3697a0187dfb58$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $ad3697a0187dfb58$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $ad3697a0187dfb58$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $ad3697a0187dfb58$var$_arrayLikeToArray(o, minLen);
}
function $ad3697a0187dfb58$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $ad3697a0187dfb58$var$_iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $ad3697a0187dfb58$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $ad3697a0187dfb58$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $ad3697a0187dfb58$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $ad3697a0187dfb58$var$ownKeys(Object(source), !0).forEach(function(key) {
            $ad3697a0187dfb58$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $ad3697a0187dfb58$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $ad3697a0187dfb58$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
var $ad3697a0187dfb58$var$isExpression = $5OpyM$expression.isExpression;
var $ad3697a0187dfb58$var$isScaleExpression = function isScaleExpression(exp) {
    if (!$ad3697a0187dfb58$var$isExpression(exp)) return false;
    var expressionsWithOutputs = [
        "interpolate",
        "interpolate-hcl",
        "interpolate-lab",
        "step"
    ];
    var flatExpression = exp.flat(Infinity);
    return flatExpression.some(function(item) {
        return expressionsWithOutputs.includes(item);
    });
};
var $ad3697a0187dfb58$var$getInputOutputPairs = function getInputOutputPairs(value) {
    var expressionType = value[0];
    var inputOutputs = [];
    var zooms = expressionType === "step" ? [
        0
    ] : [];
    var outputs = [];
    switch(expressionType){
        case "interpolate":
        case "interpolate-hcl":
        case "interpolate-lab":
            inputOutputs = value.slice(3);
            inputOutputs.forEach(function(val, i) {
                return i % 2 === 0 ? zooms.push(val) : outputs.push(val);
            });
            break;
        case "step":
            inputOutputs = value.slice(2);
            inputOutputs.forEach(function(val, i) {
                return i % 2 !== 0 ? zooms.push(val) : outputs.push(val);
            });
            break;
    }
    var inputOutputPairs = zooms.reduce(function(acc, z, i) {
        return $ad3697a0187dfb58$var$_objectSpread($ad3697a0187dfb58$var$_objectSpread({}, acc), {}, $ad3697a0187dfb58$var$_defineProperty({}, z, outputs[i]));
    }, {});
    return {
        expressionType: expressionType,
        inputOutputPairs: inputOutputPairs
    };
};
/**
 * getExtraneousMinMaxZoom
 * Returns warnings for expressions with redundant min and max zooms in a Mapbox stylesheet
 * @param {Object} style - Mapbox stylesheet
 * @returns {Array} - warnings for min/max zoom
 */ module.exports.getInputOutputPairs = $ad3697a0187dfb58$var$getInputOutputPairs;
var $ad3697a0187dfb58$var$getExtraneousMinMaxZoom = function getExtraneousMinMaxZoom(style) {
    var warnings = []; // This function runs inside the style expressions to find extraneous min and max zooms and populate the warnings array
    var lint = function lint(layerId, expression, key) {
        var _style$layers$find = style.layers.find(function(l) {
            return l.id === layerId;
        }), minzoom = _style$layers$find.minzoom, maxzoom = _style$layers$find.maxzoom;
        minzoom = Number(minzoom);
        maxzoom = Number(maxzoom);
        var _getInputOutputPairs = $ad3697a0187dfb58$var$getInputOutputPairs(expression), expressionType = _getInputOutputPairs.expressionType, inputOutputPairs = _getInputOutputPairs.inputOutputPairs;
        var zooms = expressionType === "step" ? Object.keys(inputOutputPairs).slice(1) : Object.keys(inputOutputPairs);
        zooms = zooms.map(Number); // Check that expressions don't contain zooms outside of the min and max
        // Noting that this is a personal choice in some instances
        if (minzoom) {
            var interpolatePastMinzoom = zooms.filter(function(z) {
                return z < minzoom;
            });
            if (interpolatePastMinzoom.length) warnings.push("".concat(layerId, ": ").concat(key, " expression contains zooms less than the minzoom - ").concat(interpolatePastMinzoom.join(", ")));
        }
        if (maxzoom) {
            var interpolatePastMaxzoom = zooms.filter(function(z) {
                return z > maxzoom;
            });
            if (interpolatePastMaxzoom.length) warnings.push("".concat(layerId, ": ").concat(key, " expression contains zooms greater than the maxzoom - ").concat(interpolatePastMaxzoom.join(", ")));
        } // Check that opacity of 0 doesn't make min/max zoom redundant
        if (key.includes("opacity")) {
            var pairEntries = Object.entries(inputOutputPairs).map(function(_ref) {
                var _ref2 = $ad3697a0187dfb58$var$_slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
                return [
                    Number(k),
                    Number(v)
                ];
            }); // Handle minzoom
            if (minzoom) {
                var zeroOutput = pairEntries.filter(function(_ref3) {
                    var _ref4 = $ad3697a0187dfb58$var$_slicedToArray(_ref3, 2), k = _ref4[0], v = _ref4[1];
                    return v === 0;
                })[0];
                var outputsBelowMinzoom = pairEntries.filter(function(_ref5) {
                    var _ref6 = $ad3697a0187dfb58$var$_slicedToArray(_ref5, 2), k = _ref6[0], v = _ref6[1];
                    return k < minzoom && v === 0;
                });
                var unnecessaryPairs = outputsBelowMinzoom.filter(function(_ref7) {
                    var _ref8 = $ad3697a0187dfb58$var$_slicedToArray(_ref7, 2), k = _ref8[0], v = _ref8[1];
                    return v !== 0;
                }); // Special handling for minzoom on step expression with unspecified first zoom
                if (expressionType === "step" && zeroOutput[0] === 0 && zeroOutput[0] < minzoom) unnecessaryPairs.push(zeroOutput);
                if (!zooms.some(function(z) {
                    return z < zeroOutput[0];
                }) && zeroOutput[0] > minzoom) unnecessaryPairs.push(zeroOutput);
                var _iterator = $ad3697a0187dfb58$var$_createForOfIteratorHelper(unnecessaryPairs), _step;
                try {
                    for(_iterator.s(); !(_step = _iterator.n()).done;){
                        var pair = _step.value;
                        warnings.push("".concat(layerId, ": ").concat(key, " is at zero opacity before the minzoom - ").concat(pair[1], " at zoom ").concat(pair[0]));
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally{
                    _iterator.f();
                }
            } // Handle maxzoom
            if (maxzoom) {
                var _zeroOutput = pairEntries.filter(function(_ref9) {
                    var _ref10 = $ad3697a0187dfb58$var$_slicedToArray(_ref9, 2), k = _ref10[0], v = _ref10[1];
                    return v === 0;
                }).pop();
                var outputsAboveMaxzoom = pairEntries.filter(function(_ref11) {
                    var _ref12 = $ad3697a0187dfb58$var$_slicedToArray(_ref11, 2), k = _ref12[0], v = _ref12[1];
                    return k > maxzoom && v === 0;
                });
                var _unnecessaryPairs = outputsAboveMaxzoom.filter(function(_ref13) {
                    var _ref14 = $ad3697a0187dfb58$var$_slicedToArray(_ref13, 2), k = _ref14[0], v = _ref14[1];
                    return v !== 0;
                });
                if (!zooms.some(function(z) {
                    return z > _zeroOutput[0];
                }) && _zeroOutput[0] < maxzoom) _unnecessaryPairs.push(_zeroOutput);
                var _iterator2 = $ad3697a0187dfb58$var$_createForOfIteratorHelper(_unnecessaryPairs), _step2;
                try {
                    for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
                        var _pair = _step2.value;
                        warnings.push("".concat(layerId, ": ").concat(key, " is at zero opacity before the maxzoom - ").concat(_pair[1], " at zoom ").concat(_pair[0]));
                    }
                } catch (err) {
                    _iterator2.e(err);
                } finally{
                    _iterator2.f();
                }
            }
        }
        return expression;
    };
    var lintMinMaxZooms = (0, $5OpyM$createRecurseStyle)({
        transformFn: lint,
        transformCondition: $ad3697a0187dfb58$var$isScaleExpression
    });
    lintMinMaxZooms(style); // Less complex so just cycle through layers
    var _iterator3 = $ad3697a0187dfb58$var$_createForOfIteratorHelper(style.layers), _step3;
    try {
        for(_iterator3.s(); !(_step3 = _iterator3.n()).done;){
            var layer = _step3.value;
            var minzoom1 = layer.minzoom, maxzoom1 = layer.maxzoom;
            minzoom1 = Number(minzoom1);
            maxzoom1 = Number(maxzoom1);
            if (minzoom1 <= 0) warnings.push("".concat(layer.id, ": contains unnecessary minzoom"));
            if (maxzoom1 >= 24) warnings.push("".concat(layer.id, ": contains unnecessary maxzoom"));
        }
    } catch (err) {
        _iterator3.e(err);
    } finally{
        _iterator3.f();
    }
    return warnings;
};
module.exports.getExtraneousMinMaxZoom = $ad3697a0187dfb58$var$getExtraneousMinMaxZoom;

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
