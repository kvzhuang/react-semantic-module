'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _userList = require('client/reducers/userList');

var _userList2 = _interopRequireDefault(_userList);

var _userDetail = require('client/reducers/userDetail');

var _userDetail2 = _interopRequireDefault(_userDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
	userList: _userList2.default,
	userDetail: _userDetail2.default
});

exports.default = rootReducer;