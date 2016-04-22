'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (history) {
	return _react2.default.createElement(
		_reactRouter.Router,
		{ history: history },
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/', component: _App2.default },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: _demo2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '/user/list', component: _userList2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '/dropdown', component: _dropdown2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '/lightbox', component: _lightbox2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '/form', component: _form2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '/switches', component: _switches2.default })
		)
	);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('client/containers/App');

var _App2 = _interopRequireDefault(_App);

var _demo = require('client/containers/demo');

var _demo2 = _interopRequireDefault(_demo);

var _userList = require('client/containers/userList');

var _userList2 = _interopRequireDefault(_userList);

var _userDetail = require('client/containers/userDetail');

var _userDetail2 = _interopRequireDefault(_userDetail);

var _lightbox = require('client/containers/lightbox');

var _lightbox2 = _interopRequireDefault(_lightbox);

var _dropdown = require('client/containers/dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _form = require('client/containers/form');

var _form2 = _interopRequireDefault(_form);

var _switches = require('client/containers/switches');

var _switches2 = _interopRequireDefault(_switches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;