"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeOperationDataList = exports.ToolbarMenu = void 0;
exports["default"] = CodeExporterWrapper;
var _react = _interopRequireWildcard(require("react"));
var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));
var _graphql = require("graphql");
var _codemirror = _interopRequireDefault(require("codemirror"));
var _toposort = _interopRequireDefault(require("./toposort.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (_e) { function e(_x3) { return _e.apply(this, arguments); } e.toString = function () { return _e.toString(); }; return e; }(function (e) { throw e; }), f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function (_e2) { function e(_x4) { return _e2.apply(this, arguments); } e.toString = function () { return _e2.toString(); }; return e; }(function (e) { didErr = true; err = e; }), f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function formatVariableName(name) {
  var uppercasePattern = /[A-Z]/g;
  return name.charAt(0).toUpperCase() + name.slice(1).replace(uppercasePattern, '_$&').toUpperCase();
}
var copyIcon = /*#__PURE__*/_react["default"].createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/_react["default"].createElement("path", {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}), /*#__PURE__*/_react["default"].createElement("path", {
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"
}));
var codesandboxIcon = /*#__PURE__*/_react["default"].createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 256 296",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  preserveAspectRatio: "xMidYMid"
}, /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", {
  d: "M115.497674,261.08837 L115.497674,154.478845 L23.8139535,101.729261 L23.8139535,162.501763 L65.8104558,186.8486 L65.8104558,232.549219 L115.497674,261.08837 Z M139.311628,261.714907 L189.916577,232.563707 L189.916577,185.779949 L232.186047,161.285235 L232.186047,101.27387 L139.311628,154.895035 L139.311628,261.714907 Z M219.971965,80.8276886 L171.155386,52.5391067 L128.292316,77.4106841 L85.1040206,52.5141067 L35.8521355,81.1812296 L127.765737,134.063073 L219.971965,80.8276886 Z M0,222.211907 L0,74.4948807 L127.986799,0 L256,74.1820085 L256,221.978632 L127.983954,295.72283 L0,222.211907 Z",
  fill: "#000000"
})));
var computeOperationDataList = function computeOperationDataList(_ref) {
  var query = _ref.query,
    variables = _ref.variables;
  var operationDefinitions = getOperationNodes(query);
  var fragmentDefinitions = [];
  for (var _i = 0, _operationDefinitions = operationDefinitions; _i < _operationDefinitions.length; _i++) {
    var operationDefinition = _operationDefinitions[_i];
    if (operationDefinition.kind === 'FragmentDefinition') {
      fragmentDefinitions.push(operationDefinition);
    }
  }
  var rawOperationDataList = operationDefinitions.map(function (operationDefinition) {
    return {
      query: (0, _graphql.print)(operationDefinition),
      name: getOperationName(operationDefinition),
      displayName: getOperationDisplayName(operationDefinition),
      // $FlowFixMe: Come back for this
      type: operationDefinition.operation || 'fragment',
      variableName: formatVariableName(getOperationName(operationDefinition)),
      variables: getUsedVariables(variables, operationDefinition),
      operationDefinition: operationDefinition,
      fragmentDependencies: findFragmentDependencies(fragmentDefinitions, operationDefinition)
    };
  });
  var operationDataList = (0, _toposort["default"])(rawOperationDataList);
  return {
    operationDefinitions: operationDefinitions,
    fragmentDefinitions: fragmentDefinitions,
    rawOperationDataList: rawOperationDataList,
    operationDataList: operationDataList
  };
};
exports.computeOperationDataList = computeOperationDataList;
function createCodesandbox(_x) {
  return _createCodesandbox.apply(this, arguments);
}
function _createCodesandbox() {
  _createCodesandbox = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(files) {
    var res, json;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              files: files
            })
          });
        case 2:
          res = _context2.sent;
          _context2.next = 5;
          return res.json();
        case 5:
          json = _context2.sent;
          if (json.sandbox_id) {
            _context2.next = 10;
            break;
          }
          throw new Error('Invalid response from Codesandbox API');
        case 10:
          return _context2.abrupt("return", {
            sandboxId: json.sandbox_id
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _createCodesandbox.apply(this, arguments);
}
var findFragmentDependencies = function findFragmentDependencies(operationDefinitions, def) {
  var fragmentByName = function fragmentByName(name) {
    return operationDefinitions.find(function (def) {
      return def.name.value === name;
    });
  };
  var findReferencedFragments = function findReferencedFragments(selectionSet) {
    var selections = selectionSet.selections;
    var namedFragments = selections.map(function (selection) {
      if (selection.kind === 'FragmentSpread') {
        return fragmentByName(selection.name.value);
      } else {
        return null;
      }
    }).filter(Boolean);
    var nestedNamedFragments = selections.reduce(function (acc, selection) {
      if ((selection.kind === 'Field' || selection.kind === 'SelectionNode' || selection.kind === 'InlineFragment') && selection.selectionSet !== undefined) {
        return acc.concat(findReferencedFragments(selection.selectionSet));
      } else {
        return acc;
      }
    }, []);
    return namedFragments.concat(nestedNamedFragments);
  };
  var selectionSet = def.selectionSet;
  return findReferencedFragments(selectionSet);
};
var operationNodesMemo = [null, null];
function getOperationNodes(query) {
  if (operationNodesMemo[0] === query && operationNodesMemo[1]) {
    return operationNodesMemo[1];
  }
  var operationDefinitions = [];
  try {
    var _iterator = _createForOfIteratorHelper((0, _graphql.parse)(query).definitions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var def = _step.value;
        if (def.kind === 'FragmentDefinition' || def.kind === 'OperationDefinition') {
          operationDefinitions.push(def);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } catch (e) {}
  operationNodesMemo = [query, operationDefinitions];
  return operationDefinitions;
}
var getUsedVariables = function getUsedVariables(variables, operationDefinition) {
  return (operationDefinition.variableDefinitions || []).reduce(function (usedVariables, variable) {
    var variableName = variable.variable.name.value;
    if (variables[variableName]) {
      usedVariables[variableName] = variables[variableName];
    }
    return usedVariables;
  }, {});
};
var getOperationName = function getOperationName(operationDefinition) {
  return operationDefinition.name ? operationDefinition.name.value : operationDefinition.operation;
};
var getOperationDisplayName = function getOperationDisplayName(operationDefinition) {
  return operationDefinition.name ? operationDefinition.name.value : '<Unnamed:' + operationDefinition.operation + '>';
};

/**
 * ToolbarMenu
 *
 * A menu style button to use within the Toolbar.
 * Copied from GraphiQL: https://github.com/graphql/graphiql/blob/272e2371fc7715217739efd7817ce6343cb4fbec/src/components/ToolbarMenu.js#L16-L80
 */
var ToolbarMenu = /*#__PURE__*/function (_Component) {
  _inherits(ToolbarMenu, _Component);
  var _super = _createSuper(ToolbarMenu);
  function ToolbarMenu() {
    var _this;
    _classCallCheck(this, ToolbarMenu);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: false
    });
    _defineProperty(_assertThisInitialized(_this), "_node", void 0);
    _defineProperty(_assertThisInitialized(_this), "_listener", void 0);
    _defineProperty(_assertThisInitialized(_this), "handleOpen", function (e) {
      e.preventDefault();
      _this.setState({
        visible: true
      });
      _this._subscribe();
    });
    return _this;
  }
  _createClass(ToolbarMenu, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._release();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var visible = this.state.visible;
      return (
        /*#__PURE__*/
        // eslint-disable-next-line
        _react["default"].createElement("a", {
          className: "toolbar-menu toolbar-button",
          onClick: this.handleOpen,
          onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          },
          ref: function ref(node) {
            _this2._node = node;
          },
          title: this.props.title
        }, this.props.label, /*#__PURE__*/_react["default"].createElement("svg", {
          width: "14",
          height: "8"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          fill: "#666",
          d: "M 5 1.5 L 14 1.5 L 9.5 7 z"
        })), /*#__PURE__*/_react["default"].createElement("ul", {
          className: 'toolbar-menu-items' + (visible ? ' open' : '')
        }, this.props.children))
      );
    }
  }, {
    key: "_subscribe",
    value: function _subscribe() {
      if (!this._listener) {
        this._listener = this.handleClick.bind(this);
        document.addEventListener('click', this._listener);
      }
    }
  }, {
    key: "_release",
    value: function _release() {
      if (this._listener) {
        document.removeEventListener('click', this._listener);
        this._listener = null;
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (this._node !== e.target) {
        e.preventDefault();
        this.setState({
          visible: false
        });
        this._release();
      }
    }
  }]);
  return ToolbarMenu;
}(_react.Component);
exports.ToolbarMenu = ToolbarMenu;
var CodeDisplay = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CodeDisplay, _React$PureComponent);
  var _super2 = _createSuper(CodeDisplay);
  function CodeDisplay() {
    var _this3;
    _classCallCheck(this, CodeDisplay);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this3), "_node", void 0);
    _defineProperty(_assertThisInitialized(_this3), "editor", void 0);
    return _this3;
  }
  _createClass(CodeDisplay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.editor = (0, _codemirror["default"])(this._node, {
        value: this.props.code.trim(),
        lineNumbers: false,
        mode: this.props.mode,
        readOnly: true,
        theme: this.props.theme
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.code !== prevProps.code) {
        this.editor.setValue(this.props.code);
      }
      if (this.props.mode !== prevProps.mode) {
        this.editor.setOption('mode', this.props.mode);
      }
      if (this.props.theme !== prevProps.theme) {
        this.editor.setOption('theme', this.props.theme);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(_ref2) {
          return _this4._node = _ref2;
        }
      });
    }
  }]);
  return CodeDisplay;
}(_react["default"].PureComponent);
var CodeExporter = /*#__PURE__*/function (_Component2) {
  _inherits(CodeExporter, _Component2);
  var _super3 = _createSuper(CodeExporter);
  function CodeExporter() {
    var _this5;
    _classCallCheck(this, CodeExporter);
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this5 = _super3.call.apply(_super3, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this5), "style", void 0);
    _defineProperty(_assertThisInitialized(_this5), "state", {
      showCopiedTooltip: false,
      optionValuesBySnippet: new Map(),
      snippet: null,
      codesandboxResult: null
    });
    _defineProperty(_assertThisInitialized(_this5), "_activeSnippet", function () {
      return _this5.props.snippet || _this5.state.snippet || _this5.props.snippets[0];
    });
    _defineProperty(_assertThisInitialized(_this5), "setSnippet", function (snippet) {
      _this5.props.onSelectSnippet && _this5.props.onSelectSnippet(snippet);
      _this5.setState({
        snippet: snippet,
        codesandboxResult: null
      });
    });
    _defineProperty(_assertThisInitialized(_this5), "setLanguage", function (language) {
      var snippet = _this5.props.snippets.find(function (snippet) {
        return snippet.language === language;
      });
      if (snippet) {
        _this5.setSnippet(snippet);
      }
    });
    _defineProperty(_assertThisInitialized(_this5), "handleSetOptionValue", function (snippet, id, value) {
      _this5.props.onSetOptionValue && _this5.props.onSetOptionValue(snippet, id, value);
      var optionValuesBySnippet = _this5.state.optionValuesBySnippet;
      var snippetOptions = optionValuesBySnippet.get(snippet) || {};
      optionValuesBySnippet.set(snippet, _objectSpread(_objectSpread({}, snippetOptions), {}, _defineProperty({}, id, value)));
      return _this5.setState({
        optionValuesBySnippet: optionValuesBySnippet
      });
    });
    _defineProperty(_assertThisInitialized(_this5), "getOptionValues", function (snippet) {
      var snippetDefaults = snippet.options.reduce(function (acc, option) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, option.id, option.initial));
      }, {});
      return _objectSpread(_objectSpread(_objectSpread({}, snippetDefaults), _this5.state.optionValuesBySnippet.get(snippet) || {}), _this5.props.optionValues);
    });
    _defineProperty(_assertThisInitialized(_this5), "_generateCodesandbox", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(operationDataList) {
        var snippet, generateFiles, sandboxResult;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this5.setState({
                codesandboxResult: {
                  type: 'loading'
                }
              });
              snippet = _this5._activeSnippet();
              if (snippet) {
                _context.next = 5;
                break;
              }
              // Shouldn't be able to get in this state, but just in case...
              _this5.setState({
                codesandboxResult: {
                  type: 'error',
                  error: 'No active snippet'
                }
              });
              return _context.abrupt("return");
            case 5:
              generateFiles = snippet.generateCodesandboxFiles;
              if (generateFiles) {
                _context.next = 9;
                break;
              }
              // Shouldn't be able to get in this state, but just in case...
              _this5.setState({
                codesandboxResult: {
                  type: 'error',
                  error: 'Snippet does not support CodeSandbox'
                }
              });
              return _context.abrupt("return");
            case 9:
              _context.prev = 9;
              _context.next = 12;
              return createCodesandbox(generateFiles(_this5._collectOptions(snippet, operationDataList, _this5.props.schema)));
            case 12:
              sandboxResult = _context.sent;
              _this5.setState({
                codesandboxResult: _objectSpread({
                  type: 'success'
                }, sandboxResult)
              });
              _this5.props.onGenerateCodesandbox && _this5.props.onGenerateCodesandbox(sandboxResult);
              _context.next = 21;
              break;
            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](9);
              console.error('Error generating codesandbox', _context.t0);
              _this5.setState({
                codesandboxResult: {
                  type: 'error',
                  error: 'Failed to generate CodeSandbox'
                }
              });
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[9, 17]]);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this5), "_collectOptions", function (snippet, operationDataList, schema) {
      var _this5$props = _this5.props,
        serverUrl = _this5$props.serverUrl,
        _this5$props$context = _this5$props.context,
        context = _this5$props$context === void 0 ? {} : _this5$props$context,
        _this5$props$headers = _this5$props.headers,
        headers = _this5$props$headers === void 0 ? {} : _this5$props$headers;
      var optionValues = _this5.getOptionValues(snippet);
      return {
        serverUrl: serverUrl,
        headers: headers,
        context: context,
        operationDataList: operationDataList,
        options: optionValues,
        schema: schema
      };
    });
    return _this5;
  }
  _createClass(CodeExporter, [{
    key: "render",
    value: function render() {
      var _this6 = this;
      var _this$props = this.props,
        query = _this$props.query,
        snippets = _this$props.snippets,
        _this$props$variables = _this$props.variables,
        variables = _this$props$variables === void 0 ? {} : _this$props$variables;
      var _this$state = this.state,
        showCopiedTooltip = _this$state.showCopiedTooltip,
        codesandboxResult = _this$state.codesandboxResult;
      var snippet = this._activeSnippet();
      var name = snippet.name,
        language = snippet.language,
        generate = snippet.generate;
      var _computeOperationData = computeOperationDataList({
          query: query,
          variables: variables
        }),
        operationDefinitions = _computeOperationData.operationDefinitions,
        fragmentDefinitions = _computeOperationData.fragmentDefinitions,
        rawOperationDataList = _computeOperationData.rawOperationDataList,
        operationDataList = _computeOperationData.operationDataList;
      var optionValues = this.getOptionValues(snippet);
      var codeSnippet = operationDefinitions.length ? generate(this._collectOptions(snippet, operationDataList, this.props.schema)) : null;
      var supportsCodesandbox = snippet.generateCodesandboxFiles;
      var languages = _toConsumableArray(new Set(snippets.map(function (snippet) {
        return snippet.language;
      }))).sort(function (a, b) {
        return a.localeCompare(b);
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "graphiql-code-exporter",
        style: {
          minWidth: 410
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          fontFamily: 'system, -apple-system, San Francisco, Helvetica Neue, arial, sans-serif'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          padding: '12px 7px 8px'
        }
      }, /*#__PURE__*/_react["default"].createElement(ToolbarMenu, {
        label: language,
        title: "Language"
      }, languages.map(function (lang) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: lang,
          onClick: function onClick() {
            return _this6.setLanguage(lang);
          }
        }, lang);
      })), /*#__PURE__*/_react["default"].createElement(ToolbarMenu, {
        label: name,
        title: "Mode"
      }, snippets.filter(function (snippet) {
        return snippet.language === language;
      }).map(function (snippet) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: snippet.name,
          onClick: function onClick() {
            return _this6.setSnippet(snippet);
          }
        }, snippet.name);
      }))), snippet.options.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          padding: '0px 11px 10px'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          fontWeight: 700,
          color: 'rgb(177, 26, 4)',
          fontVariant: 'small-caps',
          textTransform: 'lowercase'
        }
      }, "Options"), snippet.options.map(function (option) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: option.id
        }, /*#__PURE__*/_react["default"].createElement("input", {
          id: option.id,
          type: "checkbox",
          style: {
            position: 'relative',
            top: -1
          }
          // $FlowFixMe: Come back for this
          ,
          checked: optionValues[option.id],
          onChange: function onChange() {
            return _this6.handleSetOptionValue(snippet, option.id,
            // $FlowFixMe: Come back for this
            !optionValues[option.id]);
          }
        }), /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: option.id,
          style: {
            paddingLeft: 5
          }
        }, option.label));
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          minHeight: 8
        }
      }), supportsCodesandbox ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          padding: '0 7px 8px'
        }
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: 'toolbar-button',
        style: _objectSpread({
          backgroundColor: 'white',
          border: 'none',
          outline: 'none',
          maxWidth: 320,
          display: 'flex'
        }, codeSnippet ? {} : {
          opacity: 0.6,
          cursor: 'default',
          background: '#ececec'
        }),
        type: "button",
        disabled: !codeSnippet,
        onClick: function onClick() {
          return _this6._generateCodesandbox(operationDataList);
        }
      }, codesandboxIcon, ' ', /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          paddingLeft: '0.5em'
        }
      }, "Create CodeSandbox")), codesandboxResult ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          paddingLeft: 5,
          paddingTop: 5
        }
      }, codesandboxResult.type === 'loading' ? 'Loading...' : codesandboxResult.type === 'error' ? "Error: ".concat(codesandboxResult.error) : /*#__PURE__*/_react["default"].createElement("a", {
        rel: "noopener noreferrer",
        target: "_blank",
        href: "https://codesandbox.io/s/".concat(codesandboxResult.sandboxId)
      }, "Visit CodeSandbox")) : null) : null), /*#__PURE__*/_react["default"].createElement("button", {
        className: 'toolbar-button',
        style: {
          fontSize: '1.2em',
          padding: 0,
          position: 'absolute',
          left: 340,
          marginTop: -20,
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 40,
          border: 'none',
          outline: 'none'
        },
        type: "link",
        onClick: function onClick() {
          (0, _copyToClipboard["default"])(codeSnippet);
          _this6.setState({
            showCopiedTooltip: true
          }, function () {
            return setTimeout(function () {
              return _this6.setState({
                showCopiedTooltip: false
              });
            }, 450);
          });
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'absolute',
          top: '-30px',
          left: '-15px',
          fontSize: 'small',
          padding: '6px 8px',
          color: '#fff',
          textAlign: 'left',
          textDecoration: 'none',
          wordWrap: 'break-word',
          backgroundColor: 'rgba(0,0,0,0.75)',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: showCopiedTooltip ? 'block' : 'none'
        },
        pointerEvents: "none"
      }, "Copied!"), copyIcon), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          padding: '15px 12px',
          margin: 0,
          borderTop: '1px solid rgb(220, 220, 220)',
          fontSize: 12
        }
      }, codeSnippet ? /*#__PURE__*/_react["default"].createElement(CodeDisplay, {
        code: codeSnippet,
        mode: snippet.codeMirrorMode,
        theme: this.props.codeMirrorTheme
      }) : /*#__PURE__*/_react["default"].createElement("div", null, "The query is invalid.", /*#__PURE__*/_react["default"].createElement("br", null), "The generated code will appear here once the errors in the query editor are resolved.")));
    }
  }]);
  return CodeExporter;
}(_react.Component);
var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);
  var _super4 = _createSuper(ErrorBoundary);
  function ErrorBoundary() {
    var _this7;
    _classCallCheck(this, ErrorBoundary);
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    _this7 = _super4.call.apply(_super4, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this7), "state", {
      hasError: false
    });
    return _this7;
  }
  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        hasError: true
      });
      console.error('Error in component', error, info);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            fontFamily: 'sans-serif'
          },
          className: "error-container"
        }, "Error generating code. Please", ' ', /*#__PURE__*/_react["default"].createElement("a", {
          href: "https://spectrum.chat/onegraph",
          target: "_blank",
          rel: "noreferrer noopener"
        }, "report your query on Spectrum"), ".");
      }
      return this.props.children;
    }
  }]);
  return ErrorBoundary;
}(_react["default"].Component);
// we borrow class names from graphiql's CSS as the visual appearance is the same
// yet we might want to change that at some point in order to have a self-contained standalone
function CodeExporterWrapper(_ref4) {
  var query = _ref4.query,
    serverUrl = _ref4.serverUrl,
    variables = _ref4.variables,
    _ref4$context = _ref4.context,
    context = _ref4$context === void 0 ? {} : _ref4$context,
    _ref4$headers = _ref4.headers,
    headers = _ref4$headers === void 0 ? {} : _ref4$headers,
    _ref4$hideCodeExporte = _ref4.hideCodeExporter,
    hideCodeExporter = _ref4$hideCodeExporte === void 0 ? function () {} : _ref4$hideCodeExporte,
    snippets = _ref4.snippets,
    snippet = _ref4.snippet,
    codeMirrorTheme = _ref4.codeMirrorTheme,
    onSelectSnippet = _ref4.onSelectSnippet,
    onSetOptionValue = _ref4.onSetOptionValue,
    optionValues = _ref4.optionValues,
    onGenerateCodesandbox = _ref4.onGenerateCodesandbox,
    schema = _ref4.schema;
  var jsonVariables = {};
  try {
    var parsedVariables = JSON.parse(variables);
    if (_typeof(parsedVariables) === 'object') {
      jsonVariables = parsedVariables;
    }
  } catch (e) {}
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "docExplorerWrap",
    style: {
      width: 440,
      minWidth: 440,
      zIndex: 7
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "doc-explorer-title-bar"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "doc-explorer-title"
  }, "Code Exporter"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "doc-explorer-rhs"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "docExplorerHide",
    onClick: hideCodeExporter
  }, "\u2715"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "doc-explorer-contents",
    style: {
      borderTop: '1px solid #d6d6d6',
      padding: 0
    }
  }, snippets.length ? /*#__PURE__*/_react["default"].createElement(ErrorBoundary, null, /*#__PURE__*/_react["default"].createElement(CodeExporter, {
    query: query,
    serverUrl: serverUrl,
    snippets: snippets,
    snippet: snippet,
    context: context,
    headers: headers,
    variables: jsonVariables,
    codeMirrorTheme: codeMirrorTheme,
    onSelectSnippet: onSelectSnippet,
    onSetOptionValue: onSetOptionValue,
    optionValues: optionValues || {},
    onGenerateCodesandbox: onGenerateCodesandbox,
    schema: schema
  })) : /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      fontFamily: 'sans-serif'
    },
    className: "error-container"
  }, "Please provide a list of snippets")));
}