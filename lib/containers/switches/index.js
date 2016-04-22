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

var _radioGroup = require('client/components/radioGroup');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switches = function (_Component) {
	_inherits(Switches, _Component);

	function Switches() {
		_classCallCheck(this, Switches);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Switches).call(this));
	}

	_createClass(Switches, [{
		key: 'radioSelect',
		value: function radioSelect(value) {
			console.log(value);
		}
	}, {
		key: 'render',
		value: function render() {
			var group = ['項目1', '項目2', '項目3', '項目4', '項目5'];
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Switches'
				),
				_react2.default.createElement('div', { className: 'content' }),
				_react2.default.createElement(
					'h3',
					null,
					'RadioGroup'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'單選且可指定預設選項，custom = true的時候產生自訂欄位，選擇之後會自動focus在input區塊'
					)
				),
				_react2.default.createElement(_radioGroup2.default, {
					group: group,
					name: 'radio',
					checkedIndex: 2,
					onSelected: this.radioSelect.bind(this),
					custom: true,
					styleName: 'radioGroup' }),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'表單送出沒有選擇的時候'
					)
				),
				_react2.default.createElement(_radioGroup2.default, {
					group: group,
					name: 'radio_none',
					onSelected: this.radioSelect.bind(this),
					custom: true,
					styleName: 'radioGroup',
					errorMessage: '請選擇項目' }),
				_react2.default.createElement(
					'h3',
					null,
					'CheckBox'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'可多選，每次選擇之後會回傳已選擇項目的陣列給使用者得知'
					)
				),
				_react2.default.createElement(_radioGroup2.default, {
					group: group,
					name: 'checkbox',
					onSelected: this.radioSelect.bind(this),
					custom: true,
					styleName: 'radioGroup',
					checkBox: true,
					maxChoose: 3 })
			);
		}
	}]);

	return Switches;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(Switches, _style2.default, { allowMultiple: true }));