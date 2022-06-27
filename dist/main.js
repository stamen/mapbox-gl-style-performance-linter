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
var $97c29e6aac54c436$var$lint = function lint(style) {
    var warnings = [];
    warnings = warnings.concat((0, $7zZJv.lintExpressions)(style));
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
        return !!(Array.isArray(exp) && exp[0] === 'match');
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
}; // Takes an array of indices and returns as an array of arrays containing the indices when they are in sequence
var $febdd3fd67a0151b$var$getSequentialIndexArrays = function getSequentialIndexArrays(arr1) {
    if (!arr1.every(function(item) {
        return typeof item === 'number';
    })) {
        console.error('Array is not made of index numbers');
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
        }while (value === arr1[checkIndex - 1] + 1)
        next.push(sequence);
    });
    return next;
};
module.exports.getSequentialIndexArrays = $febdd3fd67a0151b$var$getSequentialIndexArrays;
var $febdd3fd67a0151b$var$getDuplicateOutputs = function getDuplicateOutputs(value) {
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
    var isScale = expressionType === 'interpolate' || expressionType === 'step';
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
 */ module.exports.getDuplicateOutputs = $febdd3fd67a0151b$var$getDuplicateOutputs;
var $febdd3fd67a0151b$var$lintExpressionDuplicateOutputs = function lintExpressionDuplicateOutputs(style) {
    var warnings = []; // This function runs inside the style expressions to find single matches and populate the warnings array
    var lintOutputs = function lintOutputs(layerId, expression, key) {
        var duplicates = $febdd3fd67a0151b$var$getDuplicateOutputs(expression).map(function(item) {
            return Array.isArray(item) ? JSON.stringify(item) : item;
        });
        if (duplicates.length) warnings.push("".concat(layerId, ": ").concat(key, " contains duplicate outputs - ").concat(duplicates.join(', ')));
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
