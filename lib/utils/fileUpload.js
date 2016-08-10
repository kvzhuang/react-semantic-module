'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MIMEMap = undefined;
exports.getSignature = getSignature;
exports.uploadToS3 = uploadToS3;
exports.getFileUrl = getFileUrl;
exports.getURLData = getURLData;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIMEMap = {
	'image/jpeg': 'IMAGE',
	'image/png': 'IMAGE',
	'image/gif': 'IMAGE',
	'image/bmp': 'IMAGE',
	'image/vnd.wap.wbmp': 'IMAGE',
	'application/pdf': 'DOCUMENT',
	'application/vnd.oasis.opendocument.presentation': 'DOCUMENT',
	'application/vnd.oasis.opendocument.text': 'DOCUMENT',
	'application/msword': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCUMENT',
	'application/rtf': 'DOCUMENT',
	'application/vnd.ms-powerpoint': 'DOCUMENT',
	'application/vnd.ms-powerpoint.slideshow.macroenabled.12': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'DOCUMENT',
	'application/vnd.ms-powerpoint.template.macroenabled.12': 'DOCUMENT',
	'application/vnd.openxmlformats-officedocument.presentationml.template': 'DOCUMENT',
	'audio/x-wav': 'AUDIO',
	'audio/x-ms-wma': 'AUDIO'

};
exports.MIMEMap = MIMEMap;
function getSignature(file) {
	var jsonDataForSig = {
		apnum: "10400",
		pid: "10400",
		contentType: "image/jpeg",
		contentDisposition: file.name,
		isP: 1,
		extra: {
			multiAction: [{
				"param": {
					"basis": "9",
					"width": "625",
					"height": "0"
				},
				"isSave": "1",
				"method": "resize",
				"tag": "activityM"
			}, {
				"param": {
					"basis": "4",
					"width": "200",
					"height": "150"
				},
				"isSave": "1",
				"method": "resize",
				"tag": "activityS"
			}]
		},
		title: "Cover",
		description: "Cover"
	};
	return _jquery2.default.ajax({
		method: 'POST',
		url: 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/signature',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(jsonDataForSig)
	});
}
function uploadToS3(jsonDataForUpload, file) {
	console.log(file.type);
	var formData = new FormData();
	formData.append('key', jsonDataForUpload.objectKey);
	formData.append('content-type', 'image/jpeg');
	formData.append('acl', 'authenticated-read');
	formData.append('AWSAccessKeyId', jsonDataForUpload.AWSAccessKeyId);
	formData.append('policy', jsonDataForUpload.policyDocument);
	formData.append('signature', jsonDataForUpload.signature);
	formData.append('file', file);
	formData.append('Content-Disposition', file.name);
	return _jquery2.default.ajax({
		method: 'POST',
		url: 'http://docapi-staging-originbucket-1s73tnifzf5z3.s3.amazonaws.com',
		processData: false,
		contentType: false,
		data: formData
	});
}
function getFileUrl(fileId) {
	var config = [{ name: "原圖", tag: "" }],
	    params = {};
	params.timestamp = "1669527003";
	params.getFileArr = [];
	config.map(function (obj, index) {
		var ioi = {};
		ioi.fileId = fileId;
		ioi.protocol = "http";
		ioi.fileTag = obj.tag;
		params.getFileArr.push(ioi);
	});
	return _jquery2.default.ajax({
		method: 'POST',
		url: 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/getFileUrl',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(params),
		success: function success(result) {
			console.log(result);
		},
		error: function error(errorResult) {
			console.log(errorResult);
		}
	});
}
function getURLData(url) {
	var jsonData = {
		pid: "10400",
		apnum: "10400",
		isP: 0,
		urlList: [{
			url: url,
			tag: "fb"
		}]
	};
	return _jquery2.default.ajax({
		method: 'POST',
		url: 'http://docapi-staging-api-1712535865.us-west-2.elb.amazonaws.com/docapi/v0/htmlConvert',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify(jsonData)
	});
}

/*
export function fileUpload (pid, file){
	getSignature(file).done(function(jsonDataForUpload){
		callback.signatureDone(jsonDataForUpload);
		uploadToS3(jsonDataForUpload, file).done(function(){
			callback.uploadDone();
		})
	})

	let callback = new Object;
	let signatureDone = function(f){
		f();
		return callback;
	}
}

fileUpload(pid,file).signatureDone(function(res){

}).uploadDone(function(res){

})*/