'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _plugin = require('draft-js-mention-plugin/lib/plugin.css');

var _plugin2 = _interopRequireDefault(_plugin);

var _draftJs = require('draft-js');

var _selection = require('../../utils/selection.js');

var _SideToolbar = require('./SideToolbar');

var _SideToolbar2 = _interopRequireDefault(_SideToolbar);

var _InlineToolbar = require('./InlineToolbar');

var _InlineToolbar2 = _interopRequireDefault(_InlineToolbar);

var _component = require('./customComponent/component.js');

var _component2 = _interopRequireDefault(_component);

var _fileUpload = require('../../utils/fileUpload.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
const {hasCommandModifier} = KeyBindingUtil;

function myKeyBindingFn(e: SyntheticKeyboardEvent): string {
	console.log(e);
	if (e.keyCode === 86 && hasCommandModifier(e)) {
		return 'editor-paste';
	}
	return getDefaultKeyBinding(e);
}
*/

var mentionPlugin = (0, _draftJsMentionPlugin2.default)({
	theme: _style2.default
});
var MentionSuggestions = mentionPlugin.MentionSuggestions;

var plugins = [mentionPlugin];

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
			inlineToolbar: { show: false },
			suggestions: _this.props.mentions
		};

		_this.onChange = function (editorState) {
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
		_this.handlePaste = function (text) {
			return _this._handlePaste(text);
		};
		_this.onSearchChange = function (_ref) {
			var value = _ref.value;
			return _this._onSearchChange({ value: value });
		};
		return _this;
	}

	_createClass(RichEditor, [{
		key: '_blockRenderer',
		value: function _blockRenderer(block) {
			var type = block.getType();
			var that = this;
			if (type === 'atomic') {
				return {
					component: _component2.default,
					editable: false,
					props: {
						onRequestRemove: function onRequestRemove(blockKey) {
							that._removeBlock(blockKey);
						}
					}
				};
			} else if (type === 'HYPERLINK') {
				return {
					component: _component2.default,
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
		value: function _insertBlockComponent(type, props) {
			var entityKey = _draftJs.Entity.create(type, 'IMMUTABLE', props);
			this.onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' '));
		}
	}, {
		key: '_insertAsyncBlockComponent',
		value: function _insertAsyncBlockComponent(type, file, props) {

			if (this.props.onUploadStatusChange) this.props.onUploadStatusChange({ uploading: true });
			var currentSelection = this.state.editorState.getSelection();
			var entityKey = _draftJs.Entity.create(type, 'IMMUTABLE', props);
			this.onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' '));
			var that = this;
			(0, _fileUpload.getSignature)(file).done(function (jsonDataForUpload) {
				(0, _fileUpload.uploadToS3)(jsonDataForUpload, file).done(function () {
					(0, _fileUpload.getFileUrl)(jsonDataForUpload.fileId).done(function (res) {

						props.loading = false;
						props.src = res[0].url[0];
						props.fileId = jsonDataForUpload.fileId;

						var selection = currentSelection.set('hasFocus', false);
						console.log(selection);
						_draftJs.Entity.replaceData(entityKey, props);
						that.onChange(_draftJs.EditorState.forceSelection(that.state.editorState, selection));
						if (that.props.onUploadStatusChange) that.props.onUploadStatusChange({ uploading: false });
					});
				});
			});
		}
	}, {
		key: '_removeBlock',
		value: function _removeBlock(blockKey) {
			var editorState = this.state.editorState;
			var content = editorState.getCurrentContent();

			var block = content.getBlockForKey(blockKey);
			var blockAfter = content.getKeyAfter(blockKey);

			var targetRange = new _draftJs.SelectionState({
				anchorKey: blockKey,
				anchorOffset: 0,
				focusKey: blockAfter,
				focusOffset: block.getLength()
			});

			var withoutBlock = _draftJs.Modifier.removeRange(content, targetRange, 'backward');
			var resetBlock = _draftJs.Modifier.setBlockType(withoutBlock, withoutBlock.getSelectionAfter(), 'unstyled');

			var newState = _draftJs.EditorState.push(editorState, resetBlock, 'remove-range');

			this.onChange(newState);
		}
	}, {
		key: '_handleFileInput',
		value: function _handleFileInput(e) {
			var _this2 = this;

			var files = Array.prototype.slice.call(e.target.files, 0);

			files.forEach(function (f) {
				var props = {
					loading: true,
					fakeSrc: URL.createObjectURL(f)
				};
				if (f.type.indexOf('image') > -1) {
					_this2._insertAsyncBlockComponent("IMAGE", f, props);
				} else if (f.type.indexOf('video') > -1) {
					_this2._insertAsyncBlockComponent("VIDEO", f, props);
				} else if (f.type.indexOf('document') > -1) {
					_this2._insertAsyncBlockComponent("DOCUMENT", f, props);
				} else if (f.type.indexOf('audio') > -1) {
					props.name = f.name;
					_this2._insertAsyncBlockComponent("AUDIO", f, props);
				}
			});
		}
	}, {
		key: '_handleUploadImage',
		value: function _handleUploadImage() {
			this.refs.fileInput.click();
		}
	}, {
		key: '_handlePaste',
		value: function _handlePaste(text) {
			var youtubeReg = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
			var URLReg = /^(http|https):\/\//i;

			var that = this;

			var youtubeTest = text.match(youtubeReg);
			var URLTest = text.match(URLReg);

			if (youtubeTest) {
				setTimeout(function () {
					that._insertBlockComponent("YOUTUBE", { src: youtubeTest[0], file: youtubeTest[1], text: text });
				}, 500);
				return true;
			} else if (URLTest) {
				var _ret = function () {
					var timeoutTest = function timeoutTest(id) {
						var time = 0;
						(0, _fileUpload.getFileUrl)(id).done(function (res) {
							console.log(res);
							if (res[0].convert === 'pending') {
								setTimeout(function () {
									time = time + 500;
									timeoutTest(id);
								}, 500);
							} else {
								console.log(time);
							}
						});
					};

					(0, _fileUpload.getURLData)(text).done(function (res) {
						//console.log(res);
						(0, _fileUpload.getFileUrl)(res[0].fileId).done(function (res) {
							//console.log(res);
							_jquery2.default.getJSON(res[0].url[0], function (result) {
								console.log(result);
								//timeoutTest(result.imgUrls[0].fileId);
								that._insertBlockComponent("HYPERLINK", { title: result.title, description: result.description, img: result.imgUrls, text: text });
							});
						});
					});
					return {
						v: true
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
		}
	}, {
		key: '_onSearchChange',
		value: function _onSearchChange(_ref2) {
			var value = _ref2.value;

			//this.props.onRequestSearch(value);
			this.setState({
				suggestions: (0, _draftJsMentionPlugin.defaultSuggestionsFilter)(value, this.props.mentions)
			});
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
				{ styleName: 'editor', className: _plugin2.default.editor, id: 'richEditor' },
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
				_react2.default.createElement(_draftJsPluginsEditor2.default, {
					blockRendererFn: this.blockRenderer,
					blockStyleFn: this.blockStyler,
					editorState: editorState,
					handleKeyCommand: this.handleKeyCommand,
					onChange: this.onChange,
					placeholder: 'Write something...',
					spellCheck: true,
					readOnly: this.props.readOnly,
					ref: 'editor',
					onClick: this.focus,
					handlePastedText: this.handlePaste,
					plugins: plugins
				}),
				_react2.default.createElement(MentionSuggestions, {
					onSearchChange: this.onSearchChange,
					suggestions: this.state.suggestions
				}),
				_react2.default.createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
					onChange: this.handleFileInput })
			);
		}
	}]);

	return RichEditor;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(RichEditor, _style2.default, { allowMultiple: true });