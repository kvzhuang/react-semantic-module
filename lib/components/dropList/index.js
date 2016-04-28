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

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownList = function (_Component) {
	_inherits(DropdownList, _Component);

	function DropdownList(props) {
		_classCallCheck(this, DropdownList);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownList).call(this, props));

		_this.state = {
			open: false,
			choosen: _this.props.defaultValue || '選單項目'
		};
		_this.toggleOpen = _this.toggleOpen.bind(_this);
		return _this;
	}

	_createClass(DropdownList, [{
		key: 'toggleOpen',
		value: function toggleOpen() {
			this.setState({
				open: !this.state.open
			});
		}
	}, {
		key: 'onSelect',
		value: function onSelect(data) {
			this.setState({
				open: false,
				choosen: data.label
			});
			this.props.onSelected(data);
		}
	}, {
		key: 'render',
		value: function render() {
			var that = this;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('input', { type: 'button', styleName: 'listInput', value: this.state.choosen, onClick: this.toggleOpen.bind(this) }),
				this.state.open && _react2.default.createElement(
					_list2.default,
					{ type: this.state.posType,
						open: this.state.open,
						clickAway: this.toggleOpen },
					this.props.listContent.map(function (data, index) {
						return _react2.default.createElement(
							'li',
							{ key: index, onClick: that.onSelect.bind(that, data) },
							data.label
						);
					})
				)
			);
		}
	}]);

	return DropdownList;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(DropdownList, _style2.default, { allowMultiple: true });