import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';

export default ({ block }) => {
  console.log(block);
  const imgContent = Entity.get(block.getEntityAt(0)).data.src;
  console.log(imgContent);
  return <img src={imgContent} />;
};
/*
class ImageComponent extends Component {
	render(){
		console.log(this.props);
		return <img src={this.props.src} contentEditable={false}/>;
	}
}

export default ImageComponent;*/