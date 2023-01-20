"use strict";

var _fetch = _interopRequireDefault(require("../fetch"));
var _getOptionCombinations = _interopRequireDefault(require("../../__helpers__/getOptionCombinations"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var options = _fetch["default"].options,
  generate = _fetch["default"].generate;
var optionCombinations = (0, _getOptionCombinations["default"])(options);
var testQuery = "\nquery testQuery {\n  someData {\n    id\n  }\n}\n";
var testMutation = "\nmutation testMutation {\n  addData(id: \"id\") {\n    id\n  }\n}";
describe('Generating a JavaScript:fetch snippet', function () {
  it('should generate the correct query snippet', function () {
    optionCombinations.forEach(function (options) {
      var snippet = generate({
        headers: {},
        variables: {},
        serverUrl: 'https://api.myservice.com/',
        operation: testQuery,
        operationType: 'query',
        variableName: 'TEST_QUERY',
        operationName: 'testQuery',
        options: options
      });
      expect({
        options: options,
        snippet: '\n' + snippet
      }).toMatchSnapshot();
    });
  });
  it('should generate the correct mutation snippet', function () {
    optionCombinations.forEach(function (options) {
      var snippet = generate({
        headers: {},
        variables: {},
        serverUrl: 'https://api.myservice.com/',
        operation: testMutation,
        operationType: 'mutation',
        variableName: 'TEST_MUTATION',
        operationName: 'testMutation',
        options: options
      });
      expect({
        options: options,
        snippet: '\n' + snippet
      }).toMatchSnapshot();
    });
  });
});