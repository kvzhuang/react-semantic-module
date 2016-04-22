'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceMap = {};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function asyncBeApi(store) {
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
			var targetArray = target.split('/');
			var targetService = '';
			var targetMethod = '';

			if (/\:.+/.test(target)) {
				targetService = capitalizeFirstLetter(targetArray[1]);
				targetMethod = httpMethod + targetService;
			} else {
				targetService = capitalizeFirstLetter(targetArray[1]);
				targetMethod = httpMethod + (targetArray[2] ? capitalizeFirstLetter(targetArray[2]) : targetService);
			}

			return new _bluebird2.default(function (resolve, reject) {
				var serviceName = targetService + 'Service';
				var serviceInstance = null;

				if (!serviceMap[serviceName]) {
					var service = require('server/services/' + serviceName);
					service = service.default;

					serviceInstance = service.getInstance();
					serviceMap[serviceName] = serviceInstance;
				} else {
					serviceInstance = serviceMap[serviceName];
				}

				serviceInstance[targetMethod](params, function (response) {
					next({
						type: type,
						response: response
					});

					resolve();
				});
			});
		};
	};
}

module.exports = asyncBeApi;