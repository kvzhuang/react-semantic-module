'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkboxWithLabel = require('client/components/checkboxWithLabel');

var _checkboxWithLabel2 = _interopRequireDefault(_checkboxWithLabel);

var _user = require('client/actions/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserList = function (_Component) {
	_inherits(UserList, _Component);

	_createClass(UserList, null, [{
		key: 'fetchData',
		value: function fetchData(_ref) {
			var params = _ref.params;
			var store = _ref.store;

			return store.dispatch((0, _user.loadUserList)(params));
		}
	}]);

	function UserList(props, context) {
		_classCallCheck(this, UserList);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(UserList).call(this, props, context));
	}

	_createClass(UserList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.loadUserList(this.props.paramMap);
		}
	}, {
		key: 'addUser',
		value: function addUser() {
			//this.props.addUser();
		}
	}, {
		key: 'deleteMultiUser',
		value: function deleteMultiUser() {
			if (window.confirm('Are you sure?')) {
				console.log('delete multi user');
				console.log(this.props.userList);
			};

			//this.props.deleteMultiUser();
		}
	}, {
		key: 'updateUser',
		value: function updateUser(user) {
			console.log(user);return;
			//this.props.updateUser();
		}
	}, {
		key: 'deleteUser',
		value: function deleteUser(user) {
			console.log(user);return;
			if (window.confirm('Are you sure?')) {
				console.log('delete user');
				console.log(this.props.userList);
			};

			//this.props.deleteUser();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var userList = this.props.userList.map(function (user, index) {
				return _react2.default.createElement(
					'div',
					{ className: 'user-list-item', key: index },
					_react2.default.createElement(
						'div',
						{ className: 'item-options left' },
						_react2.default.createElement(_checkboxWithLabel2.default, { target: user })
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
									_this2.props.template.userName
								),
								_react2.default.createElement(
									'dd',
									{ className: 'td' },
									_react2.default.createElement(
										_reactRouter.Link,
										{ to: "/user/" + user.id },
										user.name
									),
									_react2.default.createElement(
										'button',
										{ type: 'button', className: 'right', onClick: _this2.updateUser.bind(_this2, user) },
										'update'
									),
									_react2.default.createElement(
										'button',
										{ type: 'button', className: 'right', onClick: _this2.deleteUser.bind(_this2, user) },
										'delete'
									)
								)
							)
						)
					)
				);
			});

			return _react2.default.createElement(
				'div',
				{ className: 'user-list' },
				_react2.default.createElement(
					'div',
					{ className: 'title clearfix' },
					_react2.default.createElement(
						'h1',
						{ className: 'left' },
						'UserList Page'
					),
					_react2.default.createElement(
						'button',
						{ type: 'button', className: 'right', onClick: this.addUser },
						'add'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'user-list-item' },
					_react2.default.createElement(
						'div',
						{ className: 'item-options left' },
						_react2.default.createElement(
							'button',
							{ type: 'button', className: 'right', onClick: this.deleteMultiUser },
							'delete'
						)
					),
					_react2.default.createElement('div', { className: 'item-title' })
				),
				userList
			);
		}
	}]);

	return UserList;
}(_react.Component);

function mapStateToProps(state, props) {
	var paramMap = Object.assign({}, props.params, props.location.query);
	return {
		userList: state.userList.data,
		template: state.userList.template,
		paramMap: paramMap
	};
}

exports.UserList = UserList;
exports.default = (0, _reactRedux.connect)(mapStateToProps, { loadUserList: _user.loadUserList })(UserList);