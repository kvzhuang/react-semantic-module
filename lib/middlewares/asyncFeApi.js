'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncFeApi(store) {
	return function (next) {
		return function (action) {
			if (!action['CALL_API']) {
				return next(action);
			}

			var request = action['CALL_API'];
			var type = request.type;
			var httpMethod = request.method;
			var target = request.target;
			var params = request.params || {};
			var namespace = '';

			if (/\:.+/.test(target)) {
				(function () {
					var targetArray = target.split('/');
					var namespaceAry = [];

					targetArray.map(function (space) {
						if (space) {
							if (/\:.+/.test(space)) {
								var name = space.replace(':', '');

								if (params[name]) {
									namespaceAry.push(params[name]);
									delete params[name];
								}
							} else {
								namespaceAry.push(space);
							}
						}
					});

					namespace = '/' + namespaceAry.join('/');
				})();
			} else {
				namespace = target;
			}

			return new _bluebird2.default(function (resolve, reject) {

				function responseCallback(e, response) {
					next({
						type: type,
						response: response.body
					});

					resolve();
				}

				delete params.serverSide;

				httpMethod = httpMethod.toLowerCase();
				target = '/ajax' + namespace;

				switch (httpMethod) {
					case 'get':
						_superagent2.default.get(target).end(responseCallback);
						break;

					case 'post':
						_superagent2.default.post(target).send(params).end(responseCallback);
						break;

					case 'put':
						_superagent2.default.put(target).send(params).end(responseCallback);
						break;

					case 'delete':
						_superagent2.default.del(target).end(responseCallback);
						break;
				}
			});
		};
	};
}

module.exports = asyncFeApi;