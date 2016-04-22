'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _reduxLogger2.default)({
	level: 'log',
	collapsed: false,
	logger: console,
	predicate: function predicate(getState, action) {
		return true;
	}
});

exports.default = logger;