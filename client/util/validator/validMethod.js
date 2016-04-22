import validator from 'validator';

const Message = {
	notEmpty: '不可為空',
	isURL: '含有不法字元',
	isName: '含有不法字元',
	maxLength: '超過字數限制',
	minLength: '字數不足',
	illegalText: '有不合法字元',
	isEmail:'email格式不合法'
}

const result = function(name, expression){

	let message = '';

	if(!expression){
		message = Message[name];
	}

	return{
		status: expression,
		errorMessage: message
	}
	
}

const Method = {
	notEmpty: function(value){

		return result(this.notEmpty.name, value.length > 0);
	},

	isURL: function(value){

		return result(this.isURL.name, validator.isURL(value));
	},
	
	isName: function(value){

		return result(this.isName.name, value.match(/^[a-z0-9_-]{3,16}$/));
	},

	isEmail: function(value){

		let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return result(this.isEmail.name, value.match(regex));
	},

	maxLength: function(value, length) {

		return result(this.maxLength.name, value.length <= length);	
	},

	minLength: function(value, length) {

		return result(this.minLength.name, value.length > length);	
	},

	illegalText: function(value, text) {

		let result = false, i=0;

		if( typeof(text) === 'string' ) {
			result = value.match(text);
		}else if ( typeof(text) === 'array' ) {
			while(!result) {
				result = value.match(text[i]);
				i++;
			}
		}else {
			console.log("not avalible type");
		}

		return result(this.illegalText.name, !result);	
	},


}
	
export { Method, Message };