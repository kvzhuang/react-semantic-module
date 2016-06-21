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

var _draftJs = require('draft-js');

var _selection = require('../../utils/selection.js');

var _SideToolbar = require('./SideToolbar');

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

var _InlineToolbar = require('./InlineToolbar');

var _InlineToolbar2 = _interopRequireDefault(_InlineToolbar);

var _ImageComponent = require('./ImageComponent.js');

var _ImageComponent2 = _interopRequireDefault(_ImageComponent);

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

var decorator = new _draftJs.CompositeDecorator([{
	strategy: findLinkEntities,
	component: Link
}]);

var RichEditor = function (_Component) {
	_inherits(RichEditor, _Component);

	function RichEditor(props) {
		_classCallCheck(this, RichEditor);

		/* LINK declartion*/

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RichEditor).call(this, props));

		var editorState = null;
		if (props.editorState) {
			editorState = props.editorState;
		} else if (props.content) {
			var blocks = (0, _draftJs.convertFromRaw)(props.content);
			_this.propsContent = props.content;
			editorState = _draftJs.EditorState.createWithContent(blocks, decorator);
		} else {
			editorState = _draftJs.EditorState.createEmpty(decorator);
		}

		_this.state = {
			editorState: editorState,
			inlineToolbar: { show: false }
		};

		_this.onChange = function (editorState) {
			/*const selectionRange = getSelectionRange();
   if (!editorState.getSelection().isCollapsed()) {
   	const selectionCoords = getSelectionCoords(selectionRange);
   		this.setState({
   			inlineToolbar: {
   				show: true,
   				position: {
   					top: selectionCoords.offsetTop,
   					left: selectionCoords.offsetLeft
   				}
   			}
   		});
   }*/
			_this.setState({ editorState: editorState });
			if (props.onChange) props.onChange(editorState.getCurrentContent());
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
		_this.cleanInput = function () {
			_this.refs.fileInput.value = null;
		};
		return _this;
	}

	/*
 componentDidMount() {
 	const test = "<p>1231231231</p><p><img src='http://img.ltn.com.tw/Upload/ent/page/800/2015/12/12/php10lj6O.jpg'/></p><p><br></p>"
 	const contentState = stateFromHTML(test);
 	console.log(convertToRaw(contentState));
 	const state = EditorState.createWithContent(contentState);
 	console.log(state);
 	this.onChange(state);
 }*/

	_createClass(RichEditor, [{
		key: '_blockRenderer',
		value: function _blockRenderer(block) {
			var type = block.getType();
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
			var popoverControlVisible = false,
			    popoverControlTop = null,
			    popoverControlLeft = null,
			    selectedBlock = void 0;

			if (selectionRange) {
				var rangeBounds = selectionRange.getBoundingClientRect();
				selectedBlock = (0, _selection.getSelectedBlockElement)(selectionRange);
				if (selectedBlock && !selectionRange.collapsed) {
					popoverControlVisible = true;
					popoverControlTop = (0, _selection.getSelectionCoords)(selectionRange).offsetTop;
					popoverControlLeft = (0, _selection.getSelectionCoords)(selectionRange).offsetLeft;
					this.tempTop = popoverControlTop;
					this.tempLeft = popoverControlLeft;
				} else if (selectionRange.startContainer.id === 'toolbar-icon') {
					popoverControlVisible = true;
					popoverControlTop = this.tempTop;
					popoverControlLeft = this.tempLeft;
				}
			}

			this.setState({
				selectedBlock: selectedBlock,
				inlineToolbar: {
					show: popoverControlVisible,
					position: {
						top: popoverControlTop,
						left: popoverControlLeft
					}
				}
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
			console.log(type);
			console.log(data);
			var entityKey = _draftJs.Entity.create(type, 'IMMUTABLE', { src: data.src });
			this.onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' '));
			/*this.setState({
   	editorState,
   })*/
			this.cleanInput();
			return entityKey;
		}
	}, {
		key: '_handleFileInput',
		value: function _handleFileInput(e) {
			var _this2 = this;

			console.log(e);
			var files = Array.prototype.slice.call(e.target.files, 0);
			console.log(files);
			files.forEach(function (f) {
				console.log(f);
				if (f.type.indexOf('image') > -1) _this2.insertBlockComponent("IMAGE", { src: URL.createObjectURL(f) });else if (f.type.indexOf('video') > -1) _this2.insertBlockComponent("VIDEO", { src: URL.createObjectURL(f) });
			});
		}
	}, {
		key: '_handleUploadImage',
		value: function _handleUploadImage() {
			console.log(this.refs);
			this.refs.fileInput.click();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.content !== this.propsContent) {
				var blocks = (0, _draftJs.convertFromRaw)(nextProps.content);
				var editorState = _draftJs.EditorState.createWithContent(blocks, decorator);
				this.setState({ editorState: editorState });
				this.propsContent = nextProps.content;
			}
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
				//console.log(selectedBlock);
				var editor = document.getElementById('richEditor');
				var editorBounds = editor.getBoundingClientRect();
				var blockBounds = selectedBlock.getBoundingClientRect();

				sideToolbarOffsetTop = blockBounds.bottom - editorBounds.top - 31; // height of side toolbar
			}

			var contentState = editorState.getCurrentContent();
			/*let html = stateToHTML(contentState);
   
   console.log(html);*/
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

exports.default = (0, _reactCssModules2.default)(RichEditor, _style2.default, { allowMultiple: true });