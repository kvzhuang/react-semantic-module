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

var _dropList = require('client/components/dropList');

var _dropList2 = _interopRequireDefault(_dropList);

var _target = require('client/components/dropdownMenu/target');

var _target2 = _interopRequireDefault(_target);

var _item = require('client/components/dropdownMenu/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var listContent = ['asd', 'asdee'];

var DropdownPage = function (_Component) {
	_inherits(DropdownPage, _Component);

	function DropdownPage() {
		_classCallCheck(this, DropdownPage);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownPage).call(this));

		_this.state = {
			dropOpen: false,
			lightbox: false
		};
		return _this;
	}

	_createClass(DropdownPage, [{
		key: 'onSelected',
		value: function onSelected(value) {
			console.log(value);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'DropDown'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'Dropdown系列一致在onSelect的時候讓使用者取得選擇的值，再由使用者自己決定要作什麼樣的處理'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'DropDown Menu'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'DropdownMenu定義為點擊圖示後的下拉式選單'
					),
					_react2.default.createElement(
						'p',
						null,
						'帶有transition特效'
					)
				),
				_react2.default.createElement(
					_dropdownMenu2.default,
					{
						onSelected: this.onSelected.bind(this),
						styleName: 'listStyle' },
					_react2.default.createElement(
						_target2.default,
						null,
						_react2.default.createElement(_button2.default, { label: 'show',
							focus: true,
							hover: true,
							ref: 'button'
						})
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '關於', index: 1 },
						_react2.default.createElement(
							'div',
							null,
							'關於112645645645643445645648978974561231354564561231234684789423123456468421231456456'
						)
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '編輯', index: 2 },
						'編輯'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 3 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 4 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 5 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 6 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 7 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 8 },
						'其他'
					)
				),
				_react2.default.createElement(
					_dropdownMenu2.default,
					{
						onSelected: this.onSelected.bind(this),
						styleName: 'listStyle' },
					_react2.default.createElement(
						_target2.default,
						null,
						_react2.default.createElement(_button2.default, { label: 'show',
							focus: true,
							hover: true,
							ref: 'button'
						})
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '關於', index: 1 },
						_react2.default.createElement(
							'div',
							null,
							'關於112645645645643445645648978974561231354564561231234684789423123456468421231456456'
						)
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '編輯', index: 2 },
						'編輯'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 3 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 4 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 5 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 6 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 7 },
						'其他'
					),
					_react2.default.createElement(
						_item2.default,
						{ value: '其他', index: 8 },
						'其他'
					)
				),
				_react2.default.createElement(
					'h3',
					null,
					'Drop List'
				),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(
						'p',
						null,
						'Drop List為基本的類目選單，列表的內容為傳入的array動態產生'
					)
				),
				_react2.default.createElement(_dropList2.default, {
					listContent: listContent,
					onSelected: this.onSelected.bind(this) })
			);
		}
	}]);

	return DropdownPage;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(DropdownPage, _style2.default, { allowMultiple: true }));