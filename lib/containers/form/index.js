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

var _validator = require('../../util/validator');

var _validator2 = _interopRequireDefault(_validator);

var _c_wap_module = require('c_wap_module');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log(_c_wap_module.TextField);
var config = {
	'data': {
		'username': ['notEmpty', { maxLength: 10 }, 'isName'],
		'email': ['notEmpty', 'isEmail'],
		'url': ['notEmpty', 'isURL'],
		'editor': ['notEmpty']
	},
	'customValidator': {
		dontUseThis: function dontUseThis(value) {}
	}
};
var val = new _validator2.default(config);

val.validate;

var Form = function (_Component) {
	_inherits(Form, _Component);

	function Form() {
		_classCallCheck(this, Form);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this));

		_this.state = {
			data: {
				username: "",
				job: "",
				editor: "野豬騎士來囉野"

			},
			ACData: []
		};
		return _this;
	}

	_createClass(Form, [{
		key: 'onChange',
		value: function onChange(key, value) {
			/* call AC api and get ACDATA*/
			console.log(value);
			if (key === 'job') {
				if (value.length <= 0) {
					this.setState({ ACData: [] });
				} else {
					this.setState({
						ACData: [{
							id: 1,
							value: 'aa',
							info: ''
						}, {
							id: 2,
							value: 'aaa',
							info: ''
						}, {
							id: 3,
							value: 'aaaa',
							info: ''
						}, {
							id: 4,
							value: 'aabbc',
							info: ''
						}, {
							id: 5,
							value: 'aasdas',
							info: ''
						}, {
							id: 6,
							value: 'aasdda',
							info: ''
						}, {
							id: 7,
							value: 'aaaaaaaaa',
							info: ''
						}, {
							id: 8,
							value: 'aaddssaasd',
							info: ''
						}, {
							id: 9,
							value: 'aaasdddas',
							info: ''
						}, {
							id: 10,
							value: 'dsaddddaa',
							info: ''
						}]
					});
				}
			}
		}
	}, {
		key: 'onBlur',
		value: function onBlur(key, value) {
			console.log(key, value);
			this.state.data[key] = value;
			this.setState({
				data: this.state.data,
				ACData: []
			});
		}
	}, {
		key: 'radioSelect',
		value: function radioSelect(index, value) {
			console.log(index);
			console.log(value);
		}
	}, {
		key: 'onSelected',
		value: function onSelected(value, index) {
			console.log(value, index);
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
					'Form'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'Form表單的設計原則，會讓每個form元素在觸發某個行為之後提供事件給使用者取得資料，再決定是否要更新父層的state'
					),
					_react2.default.createElement(
						'p',
						null,
						'目前的自由度依照UI盤點原則制定，開發者如果有自由度需求可以提出'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'TextFeild'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'1. 一般的input，提供onChange事件偵測實時輸入，以及onBlur事件做驗證&自動寫入state值'
					),
					_react2.default.createElement(
						'p',
						null,
						'2. allowMultiLine ＝ true 則改成以textarea型態顯示'
					),
					_react2.default.createElement(
						'p',
						null,
						'3. 提供AutoComplete UI （送api拉回值必須由使用者實作，只要改變傳入的obj的值即可改變AC的內容）'
					)
				),
				_react2.default.createElement(_c_wap_module.TextField, {
					name: 'username',
					value: this.state.data.username,
					onChange: this.onChange.bind(this),
					onBlur: this.onBlur.bind(this),
					placeHolder: '請輸入',
					styleName: 'input1',
					validator: val,
					maxWords: 10 }),
				_react2.default.createElement(_c_wap_module.TextField, {
					name: 'editor',
					value: this.state.data.editor,
					onChange: this.onChange.bind(this),
					onBlur: this.onBlur.bind(this),
					placeHolder: '請輸入',
					styleName: 'textarea',
					validator: val,
					allowMultiLine: true,
					maxWords: 50 }),
				_react2.default.createElement(_c_wap_module.TextField, {
					name: 'job',
					value: this.state.data.job,
					onChange: this.onChange.bind(this),
					onBlur: this.onBlur.bind(this),
					placeHolder: 'AC測試',
					styleName: 'input1',
					maxWords: 10,
					ACData: this.state.ACData,
					onSelected: this.onSelected.bind(this) })
			);
		}
	}]);

	return Form;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(Form, _style2.default, { allowMultiple: true }));