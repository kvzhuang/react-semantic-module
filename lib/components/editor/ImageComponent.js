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

  console.log(block);
  var imgContent = _draftJs.Entity.get(block.getEntityAt(0)).data.src;
  console.log(imgContent);
  return _react2.default.createElement('img', { src: imgContent });
};
/*
class ImageComponent extends Component {
	render(){
		console.log(this.props);
		return <img src={this.props.src} contentEditable={false}/>;
	}
}

export default ImageComponent;*/