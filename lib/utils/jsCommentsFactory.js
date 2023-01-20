"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = commentFactory;
function commentFactory(commentsEnabled, comments) {
  return function (id) {
    return commentsEnabled ? '// ' + comments[id] : '';
  };
}