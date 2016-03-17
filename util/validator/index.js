import { Method, Message } from './validMethod';

let validStatus = true,
	error = {};
let customPattern = {};

const usePattern = function(patternArr,value,key) {

	let i = 0,res;
	
	console.log(customPattern);

	while (i < patternArr.length) {
		try{

			if( typeof(patternArr[i]) === 'object') {
				for (let objKey in patternArr[i]) {
					res = Method[objKey](value, patternArr[i][objKey]);
				}
			}else res = Method[patternArr[i]](value);
			
			
			if(!res.status){
				validStatus = false;
				error[key] = res.errorMessage;
				break;
			}else {
				validStatus = true;
			}
		}
		catch(e) {
			console.log(e);
		}
		
		i++;
	}
}

class Validators {
	constructor(options){

		this.pattern = options.data || {};
		this.customValidator = options.customValidator || {};

		if ( this.customValidator !== {}){
			for( let key in this.customValidator ) {
				Method[key] = this.customValidator[key];
			}
		}
	}
	validate(inputObject){

		for ( let key in inputObject ) {
			if( typeof(this.pattern[key]) === 'undefined' ) console.log(key + '沒有對應的pattern');
			else usePattern( this.pattern[key], inputObject[key], key );	
		}

		return {
			status: validStatus,
			errorMessage: error,
			input: inputObject
		}
	}
	editMessage(inputObject) {
		for ( let key in inputObject ) {
			Message[key] = inputObject[key];
		}
	}
}
export default Validators;