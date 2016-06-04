'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJs = require('draft-js');

var _selection = require('../../utils/selection.js');

var _insertMediaBlock = require('./modifiers/insertMediaBlock');

var _insertMediaBlock2 = _interopRequireDefault(_insertMediaBlock);

var _SideToolbar = require('./SideToolbar');

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

var _InlineToolbar = require('./InlineToolbar');

var _InlineToolbar2 = _interopRequireDefault(_InlineToolbar);

var _ImageComponent = require('./ImageComponent.js');

var _ImageComponent2 = _interopRequireDefault(_ImageComponent);

var _mediaWrapper = require('./mediaWrapper.js');

var _mediaWrapper2 = _interopRequireDefault(_mediaWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function findLinkEntities(contentBlock, callback) {
	contentBlock.findEntityRanges(function (character) {
		var entityKey = character.getEntity();
		return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
	}, callback);
}

var Link = function Link(props) {
	var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData();

	var url = _Entity$get$getData.url;

	var styleLink = {
		color: '#3b5998',
		textDecoration: 'underline'
	};
	return _react2.default.createElement(
		'a',
		{ href: url, style: styleLink },
		props.children
	);
};

var RichEditor = function (_Component) {
	_inherits(RichEditor, _Component);

	function RichEditor(props) {
		_classCallCheck(this, RichEditor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RichEditor).call(this, props));

		var decorator = new _draftJs.CompositeDecorator([{
			strategy: findLinkEntities,
			component: Link
		}]);

		_this.state = {
			editorState: _draftJs.EditorState.createEmpty(decorator),
			inlineToolbar: { show: false }
		};

		_this.onChange = function (editorState) {
			console.log("onChange");
			if (!editorState.getSelection().isCollapsed()) {
				var selectionRange = (0, _selection.getSelectionRange)();
				if (selectionRange) {
					var selectionCoords = (0, _selection.getSelectionCoords)(selectionRange);
					_this.setState({
						inlineToolbar: {
							show: true,
							position: {
								top: selectionCoords.offsetTop,
								left: selectionCoords.offsetLeft
							}
						}
					});
				}
			} else {
				_this.setState({ inlineToolbar: { show: false } });
			}

			_this.setState({ editorState: editorState });
			setTimeout(_this.updateSelection, 0);
		};
		_this.focus = function () {
			return _this.refs.editor.focus();
		};
		_this.updateSelection = function () {
			return _this._updateSelection();
		};
		_this.handleKeyCommand = function (command) {
			return _this._handleKeyCommand(command);
		};
		_this.handleFileInput = function (e) {
			return _this._handleFileInput(e);
		};
		_this.handleUploadImage = function () {
			return _this._handleUploadImage();
		};
		_this.toggleBlockType = function (type) {
			return _this._toggleBlockType(type);
		};
		_this.toggleInlineStyle = function (style) {
			return _this._toggleInlineStyle(style);
		};
		_this.toggleLink = function () {
			return _this._toggleLink();
		};
		_this.onLinkKeyDown = function (e) {
			return _this._onLinkKeyDown(e);
		};
		_this.insertBlockComponent = function (type, data) {
			return _this._insertBlockComponent(type, data);
		};
		_this.insertImage = function (file) {
			return _this._insertImage(file);
		};
		_this.blockRenderer = function (block) {
			return _this._blockRenderer(block);
		};
		_this.blockStyler = function (block) {
			if (block.getType() === 'unstyled') {
				return 'paragraph';
			}
			return null;
		};
		return _this;
	}

	_createClass(RichEditor, [{
		key: '_blockRenderer',
		value: function _blockRenderer(block) {
			var type = block.getType();
			console.log(type);
			if (type === 'atomic') {
				return {
					component: _ImageComponent2.default,
					editable: false
				};
			}
		}
	}, {
		key: '_updateSelection',
		value: function _updateSelection() {
			var selectionRange = (0, _selection.getSelectionRange)();
			var selectedBlock = void 0;
			if (selectionRange) {
				selectedBlock = (0, _selection.getSelectedBlockElement)(selectionRange);
			}
			this.setState({
				selectedBlock: selectedBlock,
				selectionRange: selectionRange
			});
		}
	}, {
		key: '_handleKeyCommand',
		value: function _handleKeyCommand(command) {
			var editorState = this.state.editorState;

			var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				this.onChange(newState);
				return true;
			}
			return false;
		}
	}, {
		key: '_toggleBlockType',
		value: function _toggleBlockType(blockType) {
			this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
		}
	}, {
		key: '_toggleInlineStyle',
		value: function _toggleInlineStyle(inlineStyle) {
			this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
		}

		/*_toggleLink() {
  	const { editorState } = this.state;
  	this.setState({
  		linkInput: {
  			show: true
  		},
  		InlineToolbar: {
  			show: false
  		}
  	})
  }*/

	}, {
		key: '_onLinkKeyDown',
		value: function _onLinkKeyDown(value) {

			var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: value });
			this.setState({
				editorState: _draftJs.RichUtils.toggleLink(this.state.editorState, this.state.editorState.getSelection(), entityKey),
				inlineToolbar: { show: false }
			});
		}
	}, {
		key: '_insertBlockComponent',
		value: function _insertBlockComponent(type, data) {

			//let { editorState, entityKey } = insertMediaBlock(this.state.editorState, type, data)

			var entityKey = _draftJs.Entity.create(type, 'IMMUTABLE', { src: data.src });
			this.onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' '));
			/*this.setState({
   	editorState,
   })*/

			return entityKey;
		}
	}, {
		key: '_handleFileInput',
		value: function _handleFileInput(e) {
			var _this2 = this;

			var files = Array.prototype.slice.call(e.target.files, 0);
			files.forEach(function (f) {
				return _this2.insertBlockComponent("image", { src: URL.createObjectURL(f) });
			});
		}
	}, {
		key: '_handleUploadImage',
		value: function _handleUploadImage() {
			this.refs.fileInput.click();
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state;
			var editorState = _state.editorState;
			var selectedBlock = _state.selectedBlock;
			var selectionRange = _state.selectionRange;

			var sideToolbarOffsetTop = 0;

			if (selectedBlock) {
				var editor = document.getElementById('richEditor');
				var editorBounds = editor.getBoundingClientRect();
				var blockBounds = selectedBlock.getBoundingClientRect();

				sideToolbarOffsetTop = blockBounds.bottom - editorBounds.top - 31; // height of side toolbar
			}

			var contentState = editorState.getCurrentContent();
			var html = (0, _draftJsExportHtml.stateToHTML)(contentState);
			console.log(html);
			console.log((0, _draftJs.convertToRaw)(contentState));

			return _react2.default.createElement(
				'div',
				{ styleName: 'editor', id: 'richEditor' },
				selectedBlock ? _react2.default.createElement(_SideToolbar2.default, {
					editorState: editorState,
					style: { top: sideToolbarOffsetTop },
					onToggle: this.toggleBlockType,
					onUploadImage: this.handleUploadImage
				}) : null,
				this.state.inlineToolbar.show ? _react2.default.createElement(_InlineToolbar2.default, {
					editorState: editorState,
					onToggle: this.toggleInlineStyle,
					onLink: this.onLinkKeyDown,
					position: this.state.inlineToolbar.position
				}) : null,
				_react2.default.createElement(_draftJs.Editor, {
					blockRendererFn: this.blockRenderer,
					blockStyleFn: this.blockStyler,
					editorState: editorState,
					handleKeyCommand: this.handleKeyCommand,
					onChange: this.onChange,
					placeholder: 'Write something...',
					spellCheck: true,
					readOnly: this.props.readOnly,
					ref: 'editor',
					onClick: this.focus
				}),
				_react2.default.createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
					onChange: this.handleFileInput })
			);
		}
	}]);

	return RichEditor;
}(_react.Component);

RichEditor.defaultProps = {
	blockTypes: {
		'image': _ImageComponent2.default
	}
};
exports.default = (0, _reactCssModules2.default)(RichEditor, _style2.default, { allowMultiple: true });