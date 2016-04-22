'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserDetail = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _user = require('client/actions/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserDetail = function (_Component) {
	_inherits(UserDetail, _Component);

	_createClass(UserDetail, null, [{
		key: 'fetchData',
		value: function fetchData(_ref) {
			var params = _ref.params;
			var store = _ref.store;

			return store.dispatch((0, _user.loadUser)(params));
		}
	}]);

	function UserDetail(props, context) {
		_classCallCheck(this, UserDetail);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(UserDetail).call(this, props, context));
	}

	_createClass(UserDetail, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.loadUser(this.props.paramMap);
		}
	}, {
		key: 'updateUser',
		value: function updateUser() {
			console.log('update user');
			//this.props.updateUser();
		}
	}, {
		key: 'deleteUser',
		value: function deleteUser() {
			if (window.confirm('Are you sure?')) {
				console.log('delete user');
				console.log('OK');
			};

			//this.props.deleteUser();
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
					this.props.template.profileTitle
				),
				_react2.default.createElement(
					'div',
					{ className: 'user' },
					_react2.default.createElement(
						'div',
						{ className: 'table' },
						_react2.default.createElement(
							'dl',
							{ className: 'tr' },
							_react2.default.createElement(
								'dt',
								{ className: 'td' },
								this.props.template.userName
							),
							_react2.default.createElement(
								'dd',
								{ className: 'td' },
								_react2.default.createElement(
									_reactRouter.Link,
									{ to: "/user/" + this.props.user.id },
									this.props.user.name
								),
								_react2.default.createElement(
									'button',
									{ type: 'button', className: 'right', onClick: this.updateUser },
									'update'
								),
								_react2.default.createElement(
									'button',
									{ type: 'button', className: 'right', onClick: this.deleteUser },
									'delete'
								)
							)
						),
						_react2.default.createElement(
							'dl',
							{ className: 'tr' },
							_react2.default.createElement(
								'dt',
								{ className: 'td' },
								this.props.template.userSex
							),
							_react2.default.createElement(
								'dd',
								{ className: 'td' },
								this.props.user.sex
							)
						),
						_react2.default.createElement(
							'dl',
							{ className: 'tr' },
							_react2.default.createElement(
								'dt',
								{ className: 'td' },
								this.props.template.userEmail
							),
							_react2.default.createElement(
								'dd',
								{ className: 'td' },
								this.props.user.email
							)
						)
					)
				),
				_react2.default.createElement(
					_reactRouter.Link,
					{ to: '/' },
					'Back to Home'
				)
			);
		}
	}]);

	return UserDetail;
}(_react.Component);

function mapStateToProps(state, props) {
	var paramMap = Object.assign({}, props.params, props.location.query);
	var isMe = true;

	return {
		user: state.userDetail.data,
		template: state.userDetail.template,
		paramMap: paramMap,
		isMe: isMe
	};
}

exports.UserDetail = UserDetail;
exports.default = (0, _reactRedux.connect)(mapStateToProps, { loadUser: _user.loadUser })(UserDetail);