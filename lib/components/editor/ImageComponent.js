'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var block = _ref.block;

	var entity = _draftJs.Entity.get(block.getEntityAt(0));

	var _entity$getData = entity.getData();

	var src = _entity$getData.src;

	var type = entity.getType();
	if (type === 'IMAGE') {
		return _react2.default.createElement('img', { src: src });
	} else if (type === 'VIDEO') {
		return _react2.default.createElement('video', { controls: true, src: src });
	} else if (type === 'AUDIO') {
		return _react2.default.createElement('audio', { controls: true, src: src });
	} else {
		return false;
	}
};
/*
class ImageComponent extends Component {
	render(){
		console.log(this.props);
		return <img src={this.props.src} contentEditable={false}/>;
	}
}

export default ImageComponent;*/