

class ProfileService {
	
	static getInstance() {
		if(!this.profileService){
			this.profileService = new this;
		}
		
		return this.profileService;
	}
	
	constructor() {
		this.profileService = null;
	}
	
	getProfile(params, callback) {
		var result = '123';
		setTimeout(function(){
			callback(result);
		})
	}
	
	getList(params, callback) {
		var result = '123';
		setTimeout(function(){
			callback(result);
		})
	}
};

export default ProfileService;
