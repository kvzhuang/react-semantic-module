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

var _dropdownMenu = require('client/components/dropdownMenu');

var _dropdownMenu2 = _interopRequireDefault(_dropdownMenu);

var _item = require('client/components/dropdownMenu/item');

var _item2 = _interopRequireDefault(_item);

var _lightbox = require('client/components/lightbox');

var _lightbox2 = _interopRequireDefault(_lightbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_Component) {
	_inherits(Demo, _Component);

	function Demo() {
		_classCallCheck(this, Demo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this));
	}

	_createClass(Demo, [{
		key: 'render',
		value: function render() {
			var lightboxObtion = {
				submit: {
					text: '確定',
					action: this.submit
				},
				cancel: {
					text: 'Cancel'
				},
				closeIcon: true,
				title: '野豬騎士來囉'
			};
			return _react2.default.createElement(
				'div',
				null,
				'Welcome'
			);
		}
	}]);

	return Demo;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(Demo, _style2.default, { allowMultiple: true }));