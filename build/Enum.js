"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// type Pattern = Object (a -> b);
// (constructor)
// Enum :: Array String | Object * -> Enum
var Enum = function Enum(sumTypeBody) {
  var constructors = (0, _utils.normalizeSumType)(sumTypeBody);
  var types = constructors.map((0, _utils.prop)(['name'])); // isConstructor :: String ~> Boolean

  var isConstructor = function isConstructor(c) {
    return types.indexOf(c) !== -1 || types.indexOf(c.name) !== -1;
  }; // isPatternKey :: String -> Boolean


  var isPatternKey = function isPatternKey(c) {
    return c === '_' || isConstructor(c);
  }; // isValidPattern :: Pattern -> Boolean


  var isValidPattern = function isValidPattern(p) {
    return !!Object.keys(p).filter(isPatternKey).length;
  }; // cata :: Pattern ~> EnumTagType -> b


  var cata = function cata(patternMap) {
    return function (token) {
      if (!token || !token.name) throw new Error('Invalid token passed to match');
      if (!isValidPattern(patternMap)) throw new Error('Invalid constructor in pattern');
      var action = patternMap[token.name];
      var args = token.args;
      if (!action) return (0, _utils.matchToDefault)(patternMap, args);
      return action.apply(void 0, _toConsumableArray(args));
    };
  };

  var self = {
    // match :: EnumTagType ~> Pattern -> b
    match: function match(token, pattern) {
      return cata(pattern)(token);
    },
    cata: cata,
    caseOf: cata,
    isConstructor: isConstructor
  };
  return _objectSpread({}, (0, _utils.reduceTypeConstructors)(self, constructors), self);
};

var _default = Enum;
exports.default = _default;