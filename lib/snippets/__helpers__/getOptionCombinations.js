"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getOptionCombinations;
function getOptionCombinations(options) {
  var optionIds = options.map(function (option) {
    return option.id;
  });
  var combinationCount = Math.pow(2, optionIds.length);
  return Array.from(Array(combinationCount).keys()).reduce(function (combinations, index) {
    var booleanValues = index.toString(2).padStart(3, '0').split('');
    var optionMap = optionIds.reduce(function (map, name, i) {
      map[name] = Boolean(parseInt(booleanValues[i]));
      return map;
    }, {});
    combinations.push(optionMap);
    return combinations;
  }, []);
}