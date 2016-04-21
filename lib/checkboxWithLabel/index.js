"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxWithLabel = function (_Component) {
	_inherits(CheckboxWithLabel, _Component);

	function CheckboxWithLabel(props, context) {
		_classCallCheck(this, CheckboxWithLabel);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxWithLabel).call(this, props, context));

		_this.state = { isChecked: _this.props.target.isChecked };
		return _this;
	}

	_createClass(CheckboxWithLabel, [{
		key: "onChange",
		value: function onChange() {
			var newState = !this.state.isChecked;
			this.setState({ isChecked: newState });
			this.props.target.isChecked = newState;
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"label",
				null,
				_react2.default.createElement("input", { type: "checkbox", checked: this.state.isChecked, onChange: this.onChange.bind(this) }),
				this.state.isChecked ? this.props.labelOn : this.props.labelOff
			);
		}
	}]);

	return CheckboxWithLabel;
}(_react.Component);

exports.default = CheckboxWithLabel;