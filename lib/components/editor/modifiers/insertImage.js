'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.insertImage = undefined;

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var insertImage = exports.insertImage = function insertImage(editorState, file, callback) {
	console.log(file);
	var contentState = editorState.getCurrentContent();
	var selectionState = editorState.getSelection();

	var afterRemoval = _draftJs.Modifier.removeRange(contentState, selectionState, 'backward');

	var targetSelection = afterRemoval.getSelectionAfter();
	var afterSplit = _draftJs.Modifier.splitBlock(afterRemoval, targetSelection);
	var insertionTarget = afterSplit.getSelectionAfter();

	var asMedia = _draftJs.Modifier.setBlockType(afterSplit, insertionTarget, 'media');

	var entityKey = _draftJs.Entity.create('TOKEN', 'IMMUTABLE', { preview: URL.createObjectURL(file) });

	var charData = _draftJs.CharacterMetadata.create({ entity: entityKey });

	var fragmentArray = [new _draftJs.ContentBlock({
		key: (0, _draftJs.genKey)(),
		type: 'media',
		text: ' ',
		characterList: (0, _immutable.List)((0, _immutable.Repeat)(charData, 1))
	}), new _draftJs.ContentBlock({
		key: (0, _draftJs.genKey)(),
		type: 'unstyled',
		text: '',
		characterList: (0, _immutable.List)()
	})];

	var fragment = _draftJs.BlockMapBuilder.createFromArray(fragmentArray);

	var withMedia = _draftJs.Modifier.replaceWithFragment(asMedia, insertionTarget, fragment);

	var newContent = withMedia.merge({
		selectionBefore: selectionState,
		selectionAfter: withMedia.getSelectionAfter().set('hasFocus', true)
	});

	callback(_draftJs.EditorState.push(editorState, newContent, 'insert-fragment'));
};