'use strict';

var _draftJs = require('draft-js');

var _Immutable = require('Immutable');

var _Immutable2 = _interopRequireDefault(_Immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _Immutable2.default.List;
var Repeat = _Immutable2.default.Repeat;

var InsertUtils = {
	InsertText: function InsertText(editorState, text) {
		var contentState = editorState.getCurrentContent();
		var selectionState = editorState.getSelection();

		console.log(selectionState);
		var newContentState = _draftJs.Modifier.insertText(contentState, selectionState, text);

		return _draftJs.EditorState.push(editorState, newContentState, 'insert-fragment');
	}
};
module.exports = InsertUtils;