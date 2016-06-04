'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getSelectionRange = exports.getSelectionRange = function getSelectionRange() {
  var selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  return selection.getRangeAt(0);
};

var getSelectedBlockElement = exports.getSelectedBlockElement = function getSelectedBlockElement(range) {
  var node = range.startContainer;
  do {
    var nodeIsDataBlock = node.getAttribute ? node.getAttribute('data-block') : null;
    if (nodeIsDataBlock) return node;
    node = node.parentNode;
  } while (node !== null);
  return null;
};

var getSelectionCoords = exports.getSelectionCoords = function getSelectionCoords(selectionRange) {
  var editorBounds = document.getElementById('richEditor').getBoundingClientRect();
  var rangeBounds = selectionRange.getBoundingClientRect();
  var rangeWidth = rangeBounds.right - rangeBounds.left;
  var rangeHeight = rangeBounds.bottom - rangeBounds.top;
  var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2
  /* 72px is width of inline toolbar */
   - 72 / 2;
  // 42px is height of inline toolbar (35px) + 5px center triangle and 2px for spacing
  var offsetTop = rangeBounds.top - editorBounds.top - 42;
  return { offsetLeft: offsetLeft, offsetTop: offsetTop };
};