'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _configureStore = require('client/store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _index = require('client/routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduxState = void 0;
if (window.__REDUX_STATE__) {
	try {
		reduxState = __REDUX_STATE__;
		__REDUX_STATE__ = {};
	} catch (e) {}
}

var store = (0, _configureStore2.default)(reduxState);

_reactDom2.default.render(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: store },
	(0, _index2.default)(_reactRouter.browserHistory)
), document.getElementById('root'));