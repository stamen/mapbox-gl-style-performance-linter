var $gXNCa$mapboxglstylerecurse = require("mapbox-gl-style-recurse");
var $gXNCa$mapboxmapboxglstylespec = require("@mapbox/mapbox-gl-style-spec");

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
parcelRequire.register("d1OBf", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $7zZJv = parcelRequire("7zZJv");

var $5zdgu = parcelRequire("5zdgu");
var $97c29e6aac54c436$var$lint = function lint(style) {
    var warnings = [];
    warnings = warnings.concat((0, $7zZJv.lintExpressions)(style));
    warnings = warnings.concat((0, $5zdgu.getExtraneousMinMaxZoom)(style));
    return warnings;
};
var $97c29e6aac54c436$var$_default = $97c29e6aac54c436$var$lint;
module.exports["default"] = $97c29e6aac54c436$var$_default;

});
parcelRequire.register("7zZJv", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.lintExpressions = void 0;

var $5XvV8 = parcelRequire("5XvV8");

var $lRYX5 = parcelRequire("lRYX5");
var $584bb025c07ec82e$var$lintExpressions = function lintExpressions(style) {
    var warnings = [];
    warnings = warnings.concat((0, $5XvV8.lintSingleMatchExpressions)(style));
    warnings = warnings.concat((0, $lRYX5.lintExpressionDuplicateOutputs)(style));
    return warnings;
};
module.exports.lintExpressions = $584bb025c07ec82e$var$lintExpressions;

});
parcelRequire.register("5XvV8", function(module, exports) {
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
 */ var $456b392db4b6c0fb$var$lintSingleMatchExpressions = function lintSingleMatchExpressions(style) {
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
    var lintSingleMatches = (0, $gXNCa$mapboxglstylerecurse.createRecurseStyle)({
        transformFn: lintSingleMatch,
        transformCondition: isMatch
    });
    lintSingleMatches(style);
    return warnings;
};
module.exports.lintSingleMatchExpressions = $456b392db4b6c0fb$var$lintSingleMatchExpressions;

});

parcelRequire.register("lRYX5", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.lintExpressionDuplicateOutputs = module.exports.getSequentialIndexArrays = module.exports.getDuplicateOutputs = void 0;


function $febdd3fd67a0151b$var$_toConsumableArray(arr) {
    return $febdd3fd67a0151b$var$_arrayWithoutHoles(arr) || $febdd3fd67a0151b$var$_iterableToArray(arr) || $febdd3fd67a0151b$var$_unsupportedIterableToArray(arr) || $febdd3fd67a0151b$var$_nonIterableSpread();
}
function $febdd3fd67a0151b$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $febdd3fd67a0151b$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $febdd3fd67a0151b$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $febdd3fd67a0151b$var$_arrayLikeToArray(arr);
}
function $febdd3fd67a0151b$var$_slicedToArray(arr, i) {
    return $febdd3fd67a0151b$var$_arrayWithHoles(arr) || $febdd3fd67a0151b$var$_iterableToArrayLimit(arr, i) || $febdd3fd67a0151b$var$_unsupportedIterableToArray(arr, i) || $febdd3fd67a0151b$var$_nonIterableRest();
}
function $febdd3fd67a0151b$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $febdd3fd67a0151b$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $febdd3fd67a0151b$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $febdd3fd67a0151b$var$_arrayLikeToArray(o, minLen);
}
function $febdd3fd67a0151b$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $febdd3fd67a0151b$var$_iterableToArrayLimit(arr, i) {
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
function $febdd3fd67a0151b$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
var $febdd3fd67a0151b$var$isExpression = $gXNCa$mapboxmapboxglstylespec.expression.isExpression;
var $febdd3fd67a0151b$var$hasOutputs = function hasOutputs(exp) {
    if (!$febdd3fd67a0151b$var$isExpression(exp)) return false;
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
var $febdd3fd67a0151b$var$getSequentialIndexArrays = function getSequentialIndexArrays(arr1) {
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
module.exports.getSequentialIndexArrays = $febdd3fd67a0151b$var$getSequentialIndexArrays;
var $febdd3fd67a0151b$var$getDuplicateOutputs = function getDuplicateOutputs1(value) {
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
        var _pair = $febdd3fd67a0151b$var$_slicedToArray(pair, 2), k = _pair[0], v = _pair[1];
        if (isScale) {
            var sequences = $febdd3fd67a0151b$var$getSequentialIndexArrays(v);
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
    duplicateOutputs = $febdd3fd67a0151b$var$_toConsumableArray(duplicateOutputs).map(function(d) {
        return JSON.parse(d);
    });
    var nestedOutputs = outputs.filter(function(o) {
        return $febdd3fd67a0151b$var$hasOutputs(o);
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
 */ module.exports.getDuplicateOutputs = $febdd3fd67a0151b$var$getDuplicateOutputs;
var $febdd3fd67a0151b$var$lintExpressionDuplicateOutputs = function lintExpressionDuplicateOutputs(style) {
    var warnings = []; // This function runs inside the style expressions to find single matches and populate the warnings array
    var lintOutputs = function lintOutputs(layerId, expression, key) {
        var duplicates = $febdd3fd67a0151b$var$getDuplicateOutputs(expression).map(function(item) {
            return Array.isArray(item) ? JSON.stringify(item) : item;
        });
        if (duplicates.length) warnings.push("".concat(layerId, ": ").concat(key, " contains duplicate outputs - ").concat(duplicates.join(", ")));
        return expression;
    };
    var lintDuplicateOutputs = (0, $gXNCa$mapboxglstylerecurse.createRecurseStyle)({
        transformFn: lintOutputs,
        transformCondition: $febdd3fd67a0151b$var$hasOutputs
    });
    lintDuplicateOutputs(style);
    return warnings;
};
module.exports.lintExpressionDuplicateOutputs = $febdd3fd67a0151b$var$lintExpressionDuplicateOutputs;

});


parcelRequire.register("5zdgu", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getInputOutputPairs = module.exports.getExtraneousMinMaxZoom = void 0;


function $40da82c22844e279$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $40da82c22844e279$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
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
function $40da82c22844e279$var$_slicedToArray(arr, i) {
    return $40da82c22844e279$var$_arrayWithHoles(arr) || $40da82c22844e279$var$_iterableToArrayLimit(arr, i) || $40da82c22844e279$var$_unsupportedIterableToArray(arr, i) || $40da82c22844e279$var$_nonIterableRest();
}
function $40da82c22844e279$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $40da82c22844e279$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $40da82c22844e279$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $40da82c22844e279$var$_arrayLikeToArray(o, minLen);
}
function $40da82c22844e279$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $40da82c22844e279$var$_iterableToArrayLimit(arr, i) {
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
function $40da82c22844e279$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $40da82c22844e279$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $40da82c22844e279$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $40da82c22844e279$var$ownKeys(Object(source), !0).forEach(function(key) {
            $40da82c22844e279$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $40da82c22844e279$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $40da82c22844e279$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
var $40da82c22844e279$var$isExpression = $gXNCa$mapboxmapboxglstylespec.expression.isExpression;
var $40da82c22844e279$var$isScaleExpression = function isScaleExpression(exp) {
    if (!$40da82c22844e279$var$isExpression(exp)) return false;
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
var $40da82c22844e279$var$getInputOutputPairs = function getInputOutputPairs(value) {
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
        return $40da82c22844e279$var$_objectSpread($40da82c22844e279$var$_objectSpread({}, acc), {}, $40da82c22844e279$var$_defineProperty({}, z, outputs[i]));
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
 */ module.exports.getInputOutputPairs = $40da82c22844e279$var$getInputOutputPairs;
var $40da82c22844e279$var$getExtraneousMinMaxZoom = function getExtraneousMinMaxZoom(style) {
    var warnings = []; // This function runs inside the style expressions to find extraneous min and max zooms and populate the warnings array
    var lint = function lint(layerId, expression, key) {
        var _style$layers$find = style.layers.find(function(l) {
            return l.id === layerId;
        }), minzoom = _style$layers$find.minzoom, maxzoom = _style$layers$find.maxzoom;
        minzoom = Number(minzoom);
        maxzoom = Number(maxzoom);
        var _getInputOutputPairs = $40da82c22844e279$var$getInputOutputPairs(expression), expressionType = _getInputOutputPairs.expressionType, inputOutputPairs = _getInputOutputPairs.inputOutputPairs;
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
                var _ref2 = $40da82c22844e279$var$_slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
                return [
                    Number(k),
                    Number(v)
                ];
            }); // Handle minzoom
            if (minzoom) {
                var zeroOutput = pairEntries.filter(function(_ref3) {
                    var _ref4 = $40da82c22844e279$var$_slicedToArray(_ref3, 2), k = _ref4[0], v = _ref4[1];
                    return v === 0;
                })[0];
                var outputsBelowMinzoom = pairEntries.filter(function(_ref5) {
                    var _ref6 = $40da82c22844e279$var$_slicedToArray(_ref5, 2), k = _ref6[0], v = _ref6[1];
                    return k < minzoom && v === 0;
                });
                var unnecessaryPairs = outputsBelowMinzoom.filter(function(_ref7) {
                    var _ref8 = $40da82c22844e279$var$_slicedToArray(_ref7, 2), k = _ref8[0], v = _ref8[1];
                    return v !== 0;
                }); // Special handling for minzoom on step expression with unspecified first zoom
                if (expressionType === "step" && zeroOutput[0] === 0 && zeroOutput[0] < minzoom) unnecessaryPairs.push(zeroOutput);
                if (!zooms.some(function(z) {
                    return z < zeroOutput[0];
                }) && zeroOutput[0] > minzoom) unnecessaryPairs.push(zeroOutput);
                var _iterator = $40da82c22844e279$var$_createForOfIteratorHelper(unnecessaryPairs), _step;
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
                    var _ref10 = $40da82c22844e279$var$_slicedToArray(_ref9, 2), k = _ref10[0], v = _ref10[1];
                    return v === 0;
                }).pop();
                var outputsAboveMaxzoom = pairEntries.filter(function(_ref11) {
                    var _ref12 = $40da82c22844e279$var$_slicedToArray(_ref11, 2), k = _ref12[0], v = _ref12[1];
                    return k > maxzoom && v === 0;
                });
                var _unnecessaryPairs = outputsAboveMaxzoom.filter(function(_ref13) {
                    var _ref14 = $40da82c22844e279$var$_slicedToArray(_ref13, 2), k = _ref14[0], v = _ref14[1];
                    return v !== 0;
                });
                if (!zooms.some(function(z) {
                    return z > _zeroOutput[0];
                }) && _zeroOutput[0] < maxzoom) _unnecessaryPairs.push(_zeroOutput);
                var _iterator2 = $40da82c22844e279$var$_createForOfIteratorHelper(_unnecessaryPairs), _step2;
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
    var lintMinMaxZooms = (0, $gXNCa$mapboxglstylerecurse.createRecurseStyle)({
        transformFn: lint,
        transformCondition: $40da82c22844e279$var$isScaleExpression
    });
    lintMinMaxZooms(style); // Less complex so just cycle through layers
    var _iterator3 = $40da82c22844e279$var$_createForOfIteratorHelper(style.layers), _step3;
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
module.exports.getExtraneousMinMaxZoom = $40da82c22844e279$var$getExtraneousMinMaxZoom;

});


"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
Object.defineProperty(module.exports, "lint", {
    enumerable: true,
    get: function get() {
        return $4fa36e821943b400$var$_lint["default"];
    }
});

var $4fa36e821943b400$var$_lint = $4fa36e821943b400$var$_interopRequireDefault((parcelRequire("d1OBf")));
function $4fa36e821943b400$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}


//# sourceMappingURL=main.js.map
