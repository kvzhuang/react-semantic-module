'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFeild = function (_Component) {
	_inherits(TextFeild, _Component);

	function TextFeild(props) {
		_classCallCheck(this, TextFeild);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextFeild).call(this, props));

		_this.state = {
			data: _this.props.value,
			errorMessage: _this.props.errorMessage,
			ACData: _this.props.ACData,
			highlightedIndex: null
		};
		_this._onChange = _this._onChange.bind(_this);
		_this._onBlur = _this._onBlur.bind(_this);
		_this.ACStyle = {};
		_this.keyDownHandlers = {
			ArrowDown: function ArrowDown(event) {
				event.preventDefault();
				if (this.state.ACData.length === 0) {
					if (this.props.onRequestOpenAC) this.props.onRequestOpenAC();
					this.setState({
						highlightedIndex: 0
					});
				} else {
					var highlightedIndex = this.state.highlightedIndex;

					var index = highlightedIndex === null || highlightedIndex === this.state.ACData.length - 1 ? 0 : highlightedIndex + 1;
					this._performAutoCompleteOnKeyUp = true;
					this.setState({
						highlightedIndex: index
					});
				}
			},
			ArrowUp: function ArrowUp(event) {
				event.preventDefault();
				var highlightedIndex = this.state.highlightedIndex;

				var index = highlightedIndex === 0 || highlightedIndex === null ? this.state.ACData.length - 1 : highlightedIndex - 1;
				this._performAutoCompleteOnKeyUp = true;
				this.setState({
					highlightedIndex: index
				});
			},
			Enter: function Enter(event) {
				if (this.state.ACData.length === 0) {
					// menu is closed so there is no selection to accept -> do nothing
					return;
				} else if (this.state.highlightedIndex == null) {
					// input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
				} else {
						// text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
						this.select(this.state.ACData[this.state.highlightedIndex].value, this.state.highlightedIndex);
					}
			},
			Escape: function Escape(event) {
				this.setState({
					highlightedIndex: null,
					ACData: []
				});
			}
		};
		return _this;
	}

	_createClass(TextFeild, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.allowMultiLine) {
				var target = _reactDom2.default.findDOMNode(this.refs.textarea);
				target.style.height = Math.max(target.scrollHeight, target.clientHeight) + 'px';
				this.initHeight = Math.max(target.scrollHeight, target.clientHeight);
			}

			var MainElement = this.refs.textFeildMain.getBoundingClientRect();
			this.ACStyle.width = MainElement.width;
			//ACStyle.maxHeight = window.innerHeight - MainElement.top - MainElement.height - 10;
		}
	}, {
		key: '_onBlur',
		value: function _onBlur(e) {
			if (this.props.validator) {
				var validObject = {};
				validObject[this.props.name] = e.target.value;

				var validResult = this.props.validator.validate(validObject);
				if (validResult.status) {
					this.setState({
						errorMessage: ''
					});
				} else {
					this.setState({
						errorMessage: validResult.errorMessage[this.props.name]
					});
				}
			}
			if (this.state.highlightedIndex !== null) this.setState({ highlightedIndex: null });
			var that = this;
			setTimeout(function () {
				that.props.onBlur(that.props.name, that.state.data);
			}, 200);
		}
	}, {
		key: '_onChange',
		value: function _onChange(e) {
			if (this.props.allowMultiLine) {
				e.target.style.height = Math.max(e.target.scrollHeight, e.target.clientHeight, this.initHeight) + 'px';
			}

			if (this.props.maxWords && e.target.value.length > this.props.maxWords) {
				this.setState({
					errorMessage: '超過指定字數',
					ACData: []
				});
			} else {
				this.setState({
					data: e.target.value,
					errorMessage: ''
				});
				this.props.onChange(this.props.name, e.target.value);
			}
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.keyDownHandlers[event.key] && this.props.ACData) {
				this.keyDownHandlers[event.key].call(this, event);
			}
		}
	}, {
		key: 'ACMouseOver',
		value: function ACMouseOver(index) {
			this.setState({
				highlightedIndex: index
			});
		}
	}, {
		key: 'select',
		value: function select(value, index) {
			this.setState({
				data: value,
				errorMessage: '',
				ACData: []
			});
			this.props.onSelected(value, index + 1);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.data !== nextProps.value && this.props.value !== nextProps.value) {
				this.setState({ data: nextProps.value });
			}
			if (this.state.ACData !== nextProps.ACData && this.props.ACData !== nextProps.ACData) {
				this.setState({ ACData: nextProps.ACData });
			}
			if (this.props.errorMessage !== nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage) {
				this.setState({ errorMessage: nextProps.errorMessage });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var option = {
				onBlur: this._onBlur,
				onChange: this._onChange,
				value: this.state.data,
				placeholder: this.props.placeHolder
			};
			var status = '';
			var that = this;
			if (this.state.errorMessage.length > 0) status = 'error ';
			return _react2.default.createElement(
				'div',
				{ className: this.props.className },
				_react2.default.createElement(
					'div',
					{ styleName: status + 'input', ref: 'textFeildMain' },
					this.props.allowMultiLine ? _react2.default.createElement('textarea', _extends({}, option, {
						ref: 'textarea' })) : _react2.default.createElement('input', _extends({}, option, { onKeyDown: this.handleKeyDown.bind(this) })),
					this.props.maxWords && _react2.default.createElement(
						'span',
						{ styleName: 'maxWord' },
						this.state.data.length,
						'/',
						this.props.maxWords
					),
					_react2.default.createElement(
						'div',
						{ styleName: 'errorMessage' },
						this.state.errorMessage
					)
				),
				this.state.ACData && this.state.ACData.length > 0 && _react2.default.createElement(
					'div',
					{ style: this.ACStyle, styleName: 'AClist' },
					this.state.ACData.map(function (item, index) {
						var style = index === this.state.highlightedIndex ? { background: '#def6ff' } : null;
						return _react2.default.createElement(
							'li',
							{ key: index, onClick: this.select.bind(this, item.value, index), onMouseOver: this.ACMouseOver.bind(this, index), style: style },
							item.value
						);
					}, this)
				)
			);
		}
	}]);

	return TextFeild;
}(_react.Component);

TextFeild.defaultProps = {
	errorMessage: '',
	data: '',
	onRequestOpenAC: {}
};

exports.default = (0, _reactCssModules2.default)(TextFeild, _style2.default, { allowMultiple: true });