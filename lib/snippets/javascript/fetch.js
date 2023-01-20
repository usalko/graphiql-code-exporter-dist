"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _capitalizeFirstLetter = _interopRequireDefault(require("../../utils/capitalizeFirstLetter"));
var _jsCommentsFactory = _interopRequireDefault(require("../../utils/jsCommentsFactory.js"));
var _utils = require("../../utils");
require("codemirror/mode/javascript/javascript");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var snippetOptions = [{
  id: 'server',
  label: 'server-side usage',
  initial: false
}, {
  id: 'asyncAwait',
  label: 'async/await',
  initial: true
}];
var comments = {
  setup: "This setup is only needed once per application",
  nodeFetch: "Node doesn't implement fetch so we have to import it",
  graphqlError: "handle those errors like a pro",
  graphqlData: "do something great with this precious data",
  fetchError: "handle errors from fetch itself"
};
function generateDocumentQuery(operationDataList) {
  var body = operationDataList.map(function (operationData) {
    return operationData.query;
  }).join('\n\n').trim();
  return "const operationsDoc = `\n".concat((0, _utils.addLeftWhitespace)(body, 2), "\n`;");
}
var fetcherName = 'fetchGraphQL';
function operationFunctionName(operationData) {
  var type = operationData.type;
  var prefix = type === 'query' ? 'fetch' : type === 'mutation' ? 'execute' : type === 'subscription' ? 'subscribeTo' : '';
  var fnName = prefix + (prefix.length > 0 ? (0, _capitalizeFirstLetter["default"])(operationData.name) : operationData.name);
  return fnName;
}

// Promise-based functions
function promiseFetcher(serverUrl, headers) {
  return "function ".concat(fetcherName, "(operationsDoc, operationName, variables) {\n  return fetch(\n    \"").concat(serverUrl, "\",\n    {\n      method: \"POST\",").concat(headers ? "\n      headers: {\n".concat((0, _utils.addLeftWhitespace)(headers, 8), "\n      },") : '', "\n      body: JSON.stringify({\n        query: operationsDoc,\n        variables: variables,\n        operationName: operationName\n      })\n    }\n  ).then((result) => result.json());\n}");
}
function fetcherFunctions(operationDataList) {
  return operationDataList.map(function (operationData) {
    var fnName = operationFunctionName(operationData);
    var params = (operationData.operationDefinition.variableDefinitions || []).map(function (def) {
      return def.variable.name.value;
    });
    var variablesBody = params.map(function (param) {
      return "\"".concat(param, "\": ").concat(param);
    }).join(', ');
    var variables = "{".concat(variablesBody, "}");
    return "function ".concat(fnName, "(").concat(params.join(', '), ") {\n  return ").concat(fetcherName, "(\n    operationsDoc,\n    \"").concat(operationData.name, "\",\n    ").concat(variables, "\n  );\n}");
  }).join('\n\n');
}
function promiseFetcherInvocation(getComment, operationDataList, vars) {
  return operationDataList.map(function (namedOperationData) {
    var params = (namedOperationData.operationDefinition.variableDefinitions || []).map(function (def) {
      return def.variable.name.value;
    });
    var variables = Object.entries(namedOperationData.variables || {}).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return "const ".concat(key, " = ").concat(JSON.stringify(value, null, 2), ";");
    });
    return "".concat(variables.join('\n'), "\n\n").concat(operationFunctionName(namedOperationData), "(").concat(params.join(', '), ")\n  .then(({ data, errors }) => {\n    if (errors) {\n      ").concat(getComment('graphqlError'), "\n      console.error(errors);\n    }\n    ").concat(getComment('graphqlData'), "\n    console.log(data);\n  })\n  .catch((error) => {\n    ").concat(getComment('fetchError'), "\n    console.error(error);\n  });");
  }).join('\n\n');
}

// Async-await-based functions
function asyncFetcher(serverUrl, headers) {
  return "async function ".concat(fetcherName, "(operationsDoc, operationName, variables) {\n  const result = await fetch(\n    \"").concat(serverUrl, "\",\n    {\n      method: \"POST\",").concat(headers ? "\n      headers: {\n".concat((0, _utils.addLeftWhitespace)(headers, 8), "\n      },") : '', "\n      body: JSON.stringify({\n        query: operationsDoc,\n        variables: variables,\n        operationName: operationName\n      })\n    }\n  );\n\n  return await result.json();\n}");
}
function asyncFetcherInvocation(getComment, operationDataList, vars) {
  return operationDataList.map(function (namedOperationData) {
    var params = (namedOperationData.operationDefinition.variableDefinitions || []).map(function (def) {
      return def.variable.name.value;
    });
    var variables = Object.entries(namedOperationData.variables || {}).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];
      return "const ".concat(key, " = ").concat(JSON.stringify(value, null, 2), ";");
    });
    return "async function start".concat((0, _capitalizeFirstLetter["default"])(operationFunctionName(namedOperationData)), "(").concat(params.join(', '), ") {\n  const { errors, data } = await ").concat(operationFunctionName(namedOperationData), "(").concat(params.join(', '), ");\n\n  if (errors) {\n    ").concat(getComment('graphqlError'), "\n    console.error(errors);\n  }\n\n  ").concat(getComment('graphqlData'), "\n  console.log(data);\n}\n\n").concat(variables.join('\n'), "\n\nstart").concat((0, _capitalizeFirstLetter["default"])(operationFunctionName(namedOperationData)), "(").concat(params.join(', '), ");");
  }).join('\n\n');
}

// Snippet generation!
var snippet = {
  language: 'JavaScript',
  codeMirrorMode: 'javascript',
  name: 'fetch',
  options: snippetOptions,
  generate: function generate(opts) {
    var serverUrl = opts.serverUrl,
      headers = opts.headers,
      options = opts.options;
    var operationDataList = opts.operationDataList.map(function (operationData, idx) {
      if (!(0, _utils.isOperationNamed)(operationData)) {
        return _objectSpread(_objectSpread({}, operationData), {}, {
          name: "unnamed".concat((0, _capitalizeFirstLetter["default"])(operationData.type)).concat(idx + 1).trim(),
          query: "# Consider giving this ".concat(operationData.type, " a unique, descriptive\n# name in your application as a best practice\n").concat(operationData.type, " unnamed").concat((0, _capitalizeFirstLetter["default"])(operationData.type)).concat(idx + 1, " ") + operationData.query.trim().replace(/^(query|mutation|subscription) /i, '')
        });
      } else {
        return operationData;
      }
    });
    var getComment = (0, _jsCommentsFactory["default"])(true, comments);
    var serverComment = options.server ? getComment('nodeFetch') : '';
    var serverImport = options.server ? "import fetch from \"node-fetch\";\n" : '';
    var graphqlQuery = generateDocumentQuery(operationDataList);
    var vars = JSON.stringify({}, null, 2);
    var headersValues = [];
    for (var _i2 = 0, _Object$keys = Object.keys(headers); _i2 < _Object$keys.length; _i2++) {
      var header = _Object$keys[_i2];
      if (header && headers[header]) {
        headersValues.push("\"".concat(header, "\": \"").concat(headers[header], "\""));
      }
    }
    var heads = headersValues.length ? "".concat(headersValues.join(',\n')) : '';
    var requiredDeps = [options.server ? '"node-fetch": "^2.5.0"' : null].filter(Boolean);
    var packageDeps = requiredDeps.length > 0 ? "/*\nAdd these to your `package.json`:\n".concat((0, _utils.addLeftWhitespace)(requiredDeps.join(',\n'), 2), "\n*/\n") : '';
    var fetcher = options.asyncAwait ? asyncFetcher(serverUrl, heads) : promiseFetcher(serverUrl, heads);
    var fetcherFunctionsDefs = fetcherFunctions(operationDataList);
    var fetcherInvocation = options.asyncAwait ? asyncFetcherInvocation(getComment, operationDataList, vars) : promiseFetcherInvocation(getComment, operationDataList, vars);
    var snippet = "\n/*\nThis is an example snippet - you should consider tailoring it\nto your service.\n*/\n".concat(packageDeps, "\n").concat(serverComment, "\n").concat(serverImport, "\n\n").concat(fetcher, "\n\n").concat(graphqlQuery, "\n\n").concat(fetcherFunctionsDefs, "\n\n").concat(fetcherInvocation);
    return (0, _utils.collapseExtraNewlines)(snippet.trim());
  }
};
var _default = snippet;
exports["default"] = _default;