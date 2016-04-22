'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadUserList = loadUserList;
exports.loadUser = loadUser;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.deleteMultiUser = deleteMultiUser;
var LOADED_USERLIST = exports.LOADED_USERLIST = 'LOADED_USERLIST';
function loadUserList(params) {
	return {
		'CALL_API': {
			type: LOADED_USERLIST,
			method: 'get',
			target: '/profile/list',
			params: params
		}
	};
};

var LOADED_USER = exports.LOADED_USER = 'LOADED_USER';
function loadUser(params) {
	return {
		'CALL_API': {
			type: LOADED_USER,
			method: 'get',
			target: '/profile/:pid',
			params: params
		}
	};
};

var ADDED_USER = exports.ADDED_USER = 'ADDED_USER';
function addUser(params) {
	return {
		'CALL_API': {
			type: ADDED_USER,
			fe: function fe(resolve) {
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				});
			},
			be: function be(resolve) {
				profileService.getProfile(params, function (result) {
					resolve(result);
				});
			}
		}
	};
};

var UPDATED_USER = exports.UPDATED_USER = 'UPDATED_USER';
function updateUser(params) {
	return {
		'CALL_API': {
			type: UPDATED_USER,
			fe: function fe(resolve) {
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				});
			},
			be: function be(resolve) {
				profileService.getProfile(params, function (result) {
					resolve(result);
				});
			}
		}
	};
};

var DELETED_USER = exports.DELETED_USER = 'DELETED_USER';
function deleteUser(params) {
	return {
		'CALL_API': {
			type: DELETED_USER,
			fe: function fe(resolve) {
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				});
			},
			be: function be(resolve) {
				profileService.getProfile(params, function (result) {
					resolve(result);
				});
			}
		}
	};
};

var DELETED_MULTIUSER = exports.DELETED_MULTIUSER = 'DELETED_MULTIUSER';
function deleteMultiUser(params) {
	return {
		'CALL_API': {
			type: DELETED_MULTIUSER,
			fe: function fe(resolve) {
				resolve({
					method: 'get',
					apiUrl: profileService.apiUrl + '/' + params.pid,
					params: params
				});
			},
			be: function be(resolve) {
				profileService.getProfile(params, function (result) {
					resolve(result);
				});
			}
		}
	};
};