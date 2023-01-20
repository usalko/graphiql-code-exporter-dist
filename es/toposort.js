function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var operationDataByName = function operationDataByName(graph, name) {
  return graph.find(function (operationData) {
    return operationData.name === name;
  });
};
function topologicalSortHelper(node, visited, temp, graph, result) {
  temp[node.name] = true;
  var neighbors = node.fragmentDependencies;
  for (var i = 0; i < neighbors.length; i += 1) {
    var fragmentDependency = neighbors[i];
    var fragmentOperationData = operationDataByName(graph, fragmentDependency.name.value);
    if (!fragmentOperationData) {
      continue;
    }
    if (temp[fragmentOperationData.name]) {
      console.error('The operation graph has a cycle');
      continue;
    }
    if (!visited[fragmentOperationData.name]) {
      topologicalSortHelper(fragmentOperationData, visited, temp, graph, result);
    }
  }
  temp[node.name] = false;
  visited[node.name] = true;
  result.push(node);
}
export default function toposort(graph) {
  var result = [];
  var visited = {};
  var temp = {};
  var _iterator = _createForOfIteratorHelper(graph),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      if (!visited[node.name] && !temp[node.name]) {
        topologicalSortHelper(node, visited, temp, graph, result);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}