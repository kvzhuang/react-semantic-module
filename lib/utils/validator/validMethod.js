'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Message = exports.Method = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = {
	notEmpty: '不可為空',
	isURL: '含有不法字元',
	isName: '含有不法字元',
	maxLength: '超過字數限制',
	minLength: '字數不足',
	illegalText: '有不合法字元',
	isEmail: 'email格式不合法'
};

var result = function result(name, expression) {

	var message = '';

	if (!expression) {
		message = Message[name];
	}

	return {
		status: expression,
		errorMessage: message
	};
};

var Method = {
	notEmpty: function notEmpty(value) {

		return result(this.notEmpty.name, value.length > 0);
	},

	isURL: function isURL(value) {

		return result(this.isURL.name, _validator2.default.isURL(value));
	},

	isName: function isName(value) {

		return result(this.isName.name, value.match(/^[a-z0-9_-]{3,16}$/));
	},

	isEmail: function isEmail(value) {

		var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return result(this.isEmail.name, value.match(regex));
	},

	maxLength: function maxLength(value, length) {

		return result(this.maxLength.name, value.length <= length);
	},

	minLength: function minLength(value, length) {

		return result(this.minLength.name, value.length > length);
	},

	illegalText: function illegalText(value, text) {

		var result = false,
		    i = 0;

		if (typeof text === 'string') {
			result = value.match(text);
		} else if (typeof text === 'array') {
			while (!result) {
				result = value.match(text[i]);
				i++;
			}
		} else {
			console.log("not avalible type");
		}

		return result(this.illegalText.name, !result);
	}

};

exports.Method = Method;
exports.Message = Message;