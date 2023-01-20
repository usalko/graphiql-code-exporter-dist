"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fetch = _interopRequireDefault(require("./javascript/fetch"));
var _reactApollo = _interopRequireDefault(require("./javascript/reactApollo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// javascript
var _default = [_fetch["default"], _reactApollo["default"]];
exports["default"] = _default;