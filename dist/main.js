var $gXNCa$mapboxglstylerecurse = require("mapbox-gl-style-recurse");

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
var $584bb025c07ec82e$var$lintExpressions = function lintExpressions(style) {
    var warnings = [];
    warnings = warnings.concat((0, $5XvV8.lintSingleMatchExpressions)(style));
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
