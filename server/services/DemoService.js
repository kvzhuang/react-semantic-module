

class DemoService {
	
	static getInstance() {
		if(!this.demoService){
			this.demoService = new this;
		}
		
		return this.demoService;
	}
	
	constructor() {
		this.demoService = null;
	}
	
	getDemo(params, callback) {
		var result = ['123'];
		setTimeout(function(){
			callback({data:results[0]});
		})
	}
};

export default DemoService;
