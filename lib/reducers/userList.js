'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _user = require('client/actions/user');

var ActionType = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function userListReducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? { data: [], template: {} } : arguments[0];
	var action = arguments[1];

	var result = null;

	switch (action.type) {
		case ActionType.LOADED_USERLIST:
			var response = action.response;

			response[1].map(function (item) {
				item.isChecked = false;
			});

			return {
				data: response[1],
				template: response[0]
			};
			break;

		default:
			return state;
			break;
	}
}

exports.default = userListReducer;