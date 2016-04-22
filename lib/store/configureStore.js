'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _logger = require('client/middlewares/logger');

var _logger2 = _interopRequireDefault(_logger);

var _reducers = require('client/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [_reduxThunk2.default, _logger2.default];

if (typeof serverSide !== 'undefined' && serverSide === true) {
	middlewares.push(require('client/middlewares/asyncBeApi'));
} else {
	middlewares.push(require('client/middlewares/asyncFeApi'));
}

var applyMiddlewareWrap = _redux.applyMiddleware.apply(undefined, middlewares);
var createStoreWithMiddleware = applyMiddlewareWrap(_redux.createStore);

function configureStore(initialState) {
	var store = createStoreWithMiddleware(_reducers2.default, initialState);

	if (module.hot) {
		module.hot.accept('client/reducers', function () {
			var nextRootReducer = require('client/reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}