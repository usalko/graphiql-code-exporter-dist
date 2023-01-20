"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _capitalizeFirstLetter = _interopRequireDefault(require("../../utils/capitalizeFirstLetter"));
var _jsCommentsFactory = _interopRequireDefault(require("../../utils/jsCommentsFactory.js"));
var _index = require("../../utils/index.js");
require("codemirror/mode/jsx/jsx");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var comments = {
  setup: "This setup is only needed once per application"
};
function formatVariableName(operationData) {
  var name = operationData.name;
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/[A-Z]/g, '_$&').toUpperCase();
}
function operationVariableName(operation) {
  var type = operation.type;
  return formatVariableName(operation) + '_' + type.toUpperCase();
}
function operationVariables(operationData) {
  var params = (operationData.operationDefinition.variableDefinitions || []).map(function (def) {
    return def.variable.name.value;
  });
  var variablesBody = params.map(function (param) {
    return "\"".concat(param, "\": ").concat(param);
  }).join(', ');
  var variables = "{".concat(variablesBody, "}");
  var propsBody = params.map(function (param) {
    return "\"".concat(param, "\": props.").concat(param);
  }).join(', ');
  var props = "{".concat(propsBody, "}");
  return {
    params: params,
    variables: variables,
    props: props
  };
}
function operationComponentName(operationData) {
  var type = operationData.type;
  var suffix = type === 'query' ? 'Query' : type === 'mutation' ? 'Mutation' : type === 'subscription' ? 'Subscription' : '';
  return suffix.length > 0 ? '' + (0, _capitalizeFirstLetter["default"])(operationData.name) + suffix : (0, _capitalizeFirstLetter["default"])(operationData.name);
}
function mutationComponent(getComment, options, element, operationData, heads, vars) {
  var _operationVariables = operationVariables(operationData),
    params = _operationVariables.params,
    variables = _operationVariables.variables;
  var call = "".concat(operationData.name, "(").concat(params.length === 0 ? '' : "".concat(variables), ")");
  var onClick = "() => ".concat(call);
  return "<Mutation\n  mutation={".concat(operationVariableName(operationData), "}").concat(heads === '{}' ? '' : "\n  context={{ headers: ".concat(heads, " }}\n"), ">\n  {(").concat(operationData.name, ", { loading, error, data }) => {\n    if (loading) return <").concat(element, ">Loading</").concat(element, ">\n\n    if (error)\n      return (\n        <").concat(element, ">\n          Error in ").concat(operationVariableName(operationData), "\n          {JSON.stringify(error, null, 2)}\n        </").concat(element, ">\n      );\n\n    const dataEl = data ? (\n      <").concat(element, ">{JSON.stringify(data, null, 2)}</").concat(element, ">\n    ) : null;\n\n    return (\n      <div>\n        {dataEl}\n\n        <button onClick={").concat(onClick, "}>\n          Run mutation: ").concat(operationData.name, "\n        </button>\n      </div>\n    );\n  }}\n</Mutation>");
}
var queryComponent = function queryComponent(getComment, options, element, operationData, heads, vars) {
  var _operationVariables2 = operationVariables(operationData),
    params = _operationVariables2.params,
    props = _operationVariables2.props;
  return "<Query\n  query={".concat(operationVariableName(operationData), "}").concat(heads === '{}' ? '' : "\n  context={{ headers: ".concat(heads, " }}"), " ").concat(params.length === 0 ? '' : "\n  variables={".concat(props, "}"), ">\n  {({ loading, error, data }) => {\n    if (loading) return <").concat(element, ">Loading</").concat(element, ">\n    if (error)\n      return (\n        <").concat(element, ">\n          Error in ").concat(operationVariableName(operationData), "\n          {JSON.stringify(error, null, 2)}\n        </").concat(element, ">\n      );\n\n    if (data) {\n      return (\n        <").concat(element, ">{JSON.stringify(data, null, 2)}</").concat(element, ">\n      )\n    }\n  }}\n</Query>");
};
var snippet = {
  language: 'JavaScript',
  codeMirrorMode: 'jsx',
  name: 'react-apollo',
  options: [{
    id: 'client',
    label: 'with client setup',
    initial: true
  }, {
    id: 'imports',
    label: 'with required imports',
    initial: true
  }],
  generate: function generate(opts) {
    var headers = opts.headers,
      options = opts.options,
      serverUrl = opts.serverUrl;
    var getComment = (0, _jsCommentsFactory["default"])(true, comments);
    var operationDataList = opts.operationDataList.map(function (operationData, idx) {
      if (!(0, _index.isOperationNamed)(operationData)) {
        return _objectSpread(_objectSpread({}, operationData), {}, {
          name: "unnamed".concat((0, _capitalizeFirstLetter["default"])(operationData.type)).concat(idx + 1).trim(),
          query: "# Consider giving this ".concat(operationData.type, " a unique, descriptive\n# name in your application as a best practice\n").concat(operationData.type, " unnamed").concat((0, _capitalizeFirstLetter["default"])(operationData.type)).concat(idx + 1, " ") + operationData.query.trim().replace(/^(query|mutation|subscription) /i, '')
        });
      } else {
        return operationData;
      }
    });
    var element = options.reactNative ? 'View' : 'pre';
    var vars = JSON.stringify({}, null, 2);
    var headersValues = _toConsumableArray(Object.keys(headers || [])).filter(function (k) {
      return headers[k];
    }).map(function (k) {
      return "\"".concat(k, "\": \"").concat(headers[k], "\"");
    }).join(',\n');
    var heads = "{".concat(headersValues, "}");
    var packageDeps = "/*\n  Add these to your `package.json`:\n    \"apollo-boost\": \"^0.3.1\",\n    \"graphql\": \"^14.2.1\",\n    \"graphql-tag\": \"^2.10.0\",\n    \"react-apollo\": \"^2.5.5\"\n*/\n\n";
    var clientSetup = options.client ? "".concat(getComment('setup'), ";\nconst apolloClient = new ApolloClient({\n  cache: new InMemoryCache(),\n  link: new HttpLink({\n    uri: \"").concat(serverUrl, "\",\n  }),\n});\n") : '';
    var operationTypes = (0, _index.distinct)(operationDataList.map(function (operationData) {
      return operationData.type;
    }));
    var imports = [operationTypes.indexOf('query') > -1 ? 'Query' : null, operationTypes.indexOf('mutation') > -1 ? 'Mutation' : null, 'ApolloProvider'].filter(Boolean);
    var reactApolloImports = "import { ".concat(imports.join(', '), " } from \"react-apollo\";");
    var reactImports = "import React from \"react\";\nimport ReactDOM from \"react-dom\";\nimport { ".concat(options.client ? 'ApolloClient, ' : '', "InMemoryCache, HttpLink } from \"apollo-boost\";");
    var gqlImport = 'import gql from "graphql-tag";';
    var generalImports = options.imports ? "".concat(gqlImport, "\n").concat(reactImports, "\n").concat(reactApolloImports) : '';
    var components = operationDataList.map(function (operationData) {
      var componentFn = operationData.type === 'query' ? queryComponent : operationData.type === 'mutation' ? mutationComponent : function () {
        return "\"We don't support ".concat(operationData.type, " GraphQL operations yet\"");
      };
      var graphqlOperation = "const ".concat(operationVariableName(operationData), " = gql`\n").concat((0, _index.addLeftWhitespace)(operationData.query, 2), "\n`;");
      var component = "".concat(graphqlOperation, "\n\nconst ").concat(operationComponentName(operationData), " = (props) => {\n  return (\n").concat((0, _index.addLeftWhitespace)(componentFn(
      // $FlowFixMe: Add flow type to utils fn
      getComment, options, element, operationData, heads, vars), 4), "\n  )\n};");
      return component;
    }).join('\n\n');
    var componentInstantiations = operationDataList.map(function (operationData) {
      var _operationVariables3 = operationVariables(operationData),
        params = _operationVariables3.params;
      var props = params.map(function (param) {
        return "".concat(param, "={").concat(param, "}");
      }).join(' ');
      return "<".concat(operationComponentName(operationData), " ").concat(props, " />");
    }).join('\n');
    var variableInstantiations = operationDataList.map(function (operationData) {
      var variables = Object.entries(operationData.variables || {}).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        return "const ".concat(key, " = ").concat(JSON.stringify(value, null, 2), ";");
      });
      return "".concat(variables.join('\n'));
    }).join('\n\n');
    var containerComponent = "".concat(variableInstantiations, "\n\nconst container = (\n  <ApolloProvider client={apolloClient}>\n").concat((0, _index.addLeftWhitespace)(componentInstantiations, 4), "\n  </ApolloProvider>\n);");
    var snippet = "\n/* This is an example snippet - you should consider tailoring it\nto your service.\n*/\n".concat(packageDeps).concat(generalImports, "\n\n").concat(clientSetup, "\n\n").concat(components, "\n\n").concat(containerComponent, "\n\nReactDOM.render(container, document.getElementById(\"root\"));");
    return (0, _index.collapseExtraNewlines)(snippet.trim());
  }
};
var _default = snippet;
exports["default"] = _default;