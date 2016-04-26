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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var multiChoose = [];

function getSelectedChbox(frm) {
	var selchbox = []; // array that will store the value of selected checkboxes
	// gets all the input tags in frm, and their number
	var inpfields = frm.getElementsByTagName('input');
	var nr_inpfields = inpfields.length;
	// traverse the inpfields elements, and adds the value of selected (checked) checkbox in selchbox
	for (var i = 0; i < nr_inpfields; i++) {
		if (inpfields[i].checked == true) selchbox.push(inpfields[i].value);
	}
	//multiChoose = selchbox;
	return selchbox;
}

var RadioGroup = function (_Component) {
	_inherits(RadioGroup, _Component);

	function RadioGroup(props) {
		_classCallCheck(this, RadioGroup);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadioGroup).call(this, props));

		_this.state = {
			customValue: '',
			customDisable: true,
			errorMessage: props.errorMessage
		};
		return _this;
	}

	_createClass(RadioGroup, [{
		key: 'handleChange',
		value: function handleChange(index, e) {
			multiChoose = getSelectedChbox(this.refs.main);
			if (multiChoose.length > this.props.maxChoose) {
				e.target.checked = false;
				this.setState({ errorMessage: '最多選擇' + this.props.maxChoose + '個項目' });
			} else {
				this.setState({ errorMessage: '' });
				this.props.onSelected(multiChoose, index + 1);
			}
		}
	}, {
		key: 'customChange',
		value: function customChange(e) {
			this.setState({
				customValue: e.target.value
			});
		}
	}, {
		key: 'customChoose',
		value: function customChoose(e) {
			var that = this;
			this.handleChange(this.props.group.length, e);
			this.setState({
				customDisable: !e.target.checked
			});

			setTimeout(function () {
				that.refs.customInput.focus();
			}, 100);
		}
	}, {
		key: 'handleBlur',
		value: function handleBlur() {
			this.props.onSelected(getSelectedChbox(this.refs.main), this.props.group.length + 1);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.errorMessage !== nextProps.errorMessage) {
				this.setState({ errorMessage: nextProps.errorMessage });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var that = this;
			var type = this.props.checkBox ? 'checkbox' : 'radio';

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, ref: 'main' },
				this.props.group.map(function (value, index) {
					return _react2.default.createElement(
						'div',
						{ key: index, style: { display: 'inline-block' } },
						_react2.default.createElement('input', {
							type: type,
							id: that.props.name + 'radio' + index,
							name: that.props.name,
							value: value,
							onChange: that.handleChange.bind(that, index),
							defaultChecked: that.props.checkedIndex - 1 === index || that.props.checkedValue === value ? 'checked' : null }),
						_react2.default.createElement(
							'label',
							{ htmlFor: that.props.name + 'radio' + index },
							value
						)
					);
				}),
				this.props.custom && _react2.default.createElement(
					'div',
					{ style: { display: 'inline-block' } },
					_react2.default.createElement('input', {
						id: that.props.name + 'custom',
						type: type,
						value: this.state.customValue,
						name: that.props.name,
						onChange: this.customChoose.bind(this) }),
					_react2.default.createElement(
						'label',
						{ htmlFor: that.props.name + 'custom' },
						'自訂'
					),
					_react2.default.createElement('input', {
						type: 'text',
						ref: 'customInput',
						value: this.state.customValue,
						onChange: this.customChange.bind(this),
						disabled: this.state.customDisable,
						onBlur: this.handleBlur.bind(this) })
				),
				this.state.errorMessage && _react2.default.createElement(
					'div',
					{ styleName: 'error' },
					this.state.errorMessage
				)
			);
		}
	}]);

	return RadioGroup;
}(_react.Component);

RadioGroup.defaultProps = {
	errorMessage: '',
	maxChoose: 99
};
exports.default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(RadioGroup, _style2.default, { allowMultiple: true }));