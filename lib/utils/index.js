"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLeftWhitespace = addLeftWhitespace;
exports.collapseExtraNewlines = collapseExtraNewlines;
exports.distinct = distinct;
exports.findFirstNamedOperation = void 0;
exports.isOperationNamed = isOperationNamed;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function distinct(array) {
  return _toConsumableArray(new Set(array));
}
var unnamedSymbols = ['query', 'mutation', 'subscription'];
function isOperationNamed(operationData) {
  return unnamedSymbols.indexOf(operationData.name.trim()) === -1;
}
var findFirstNamedOperation = function findFirstNamedOperation(operations) {
  return operations.find(isOperationNamed);
};
exports.findFirstNamedOperation = findFirstNamedOperation;
function addLeftWhitespace(s, padding) {
  var pad = _toConsumableArray(new Array(padding + 1)).join(' ');
  return s.split('\n').map(function (x) {
    return "".concat(pad).concat(x);
  }).join('\n');
}
function collapseExtraNewlines(s) {
  return s.replace(/\n{2,}/g, '\n\n');
}