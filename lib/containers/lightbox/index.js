'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _button = require('client/components/button');

var _button2 = _interopRequireDefault(_button);

var _lightbox = require('client/components/lightbox');

var _lightbox2 = _interopRequireDefault(_lightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightboxPage = function (_Component) {
	_inherits(LightboxPage, _Component);

	function LightboxPage() {
		_classCallCheck(this, LightboxPage);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LightboxPage).call(this));

		_this.state = {
			lightbox: false,
			choose: 0
		};
		return _this;
	}

	_createClass(LightboxPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log(this.refs);
		}
	}, {
		key: 'toggleLightbox',
		value: function toggleLightbox(index) {
			this.setState({
				lightbox: !this.state.lightbox,
				choose: index
			});
		}
	}, {
		key: 'lightboxClose',
		value: function lightboxClose(e) {
			this.setState({
				lightbox: false
			});
		}
	}, {
		key: 'submit',
		value: function submit(e) {
			console.log("submit");
		}
	}, {
		key: 'action',
		value: function action(e) {
			console.log("this is a action!");
		}
	}, {
		key: 'render',
		value: function render() {
			var lightboxObtion1 = {
				submit: {
					text: '確定',
					action: this.submit
				},
				cancel: {
					text: '取消'
				}
			},
			    lightboxObtion2 = {
				submit: {
					text: '確定',
					action: this.submit
				},
				cancel: {
					text: 'Cancel'
				},
				closeIcon: true,
				title: '野豬騎士來囉'
			},
			    lightboxObtion3 = {
				closeIcon: true,
				title: '野豬騎士來囉',
				contentHeight: '400px'
			},
			    option = void 0;
			switch (this.state.choose) {
				case 1:
					option = lightboxObtion1;
					break;
				case 2:
					option = lightboxObtion2;
					break;
				case 3:
					option = lightboxObtion3;
					break;
			}
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'LightBox'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'LightBox情境主要分成三種（無title/ 有title/ 無button）'
					),
					_react2.default.createElement(
						'p',
						null,
						'預設close機制為按"取消"按扭、close icon、點擊lightbox以外的地方，點擊確定會有提供事件給使用者決定動作'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'無TITLE'
				),
				_react2.default.createElement(_button2.default, { label: 'show',
					focus: true,
					hover: true,
					ref: 'button',
					onClick: this.toggleLightbox.bind(this, 1)
				}),
				_react2.default.createElement(
					'h3',
					null,
					'有TITLE跟button'
				),
				_react2.default.createElement(_button2.default, { label: 'show',
					focus: true,
					hover: true,
					ref: 'button',
					onClick: this.toggleLightbox.bind(this, 2)
				}),
				_react2.default.createElement(
					'h3',
					null,
					'有TITLE無button'
				),
				_react2.default.createElement(_button2.default, { label: 'show',
					focus: true,
					hover: true,
					ref: 'button',
					onClick: this.toggleLightbox.bind(this, 3)
				}),
				this.state.lightbox && _react2.default.createElement(
					_lightbox2.default,
					{ open: this.state.lightbox,
						option: option,
						onClose: this.lightboxClose.bind(this) },
					_react2.default.createElement(
						'h3',
						null,
						'刪除背景照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					),
					_react2.default.createElement(
						'p',
						null,
						'移除照片後，會顯示系統預設的照片'
					)
				)
			);
		}
	}]);

	return LightboxPage;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(LightboxPage, _style2.default, { allowMultiple: true }));