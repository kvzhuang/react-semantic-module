import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';

export default ({ block }) => {
  const entity = Entity.get(block.getEntityAt(0));
	const {src} =  entity.getData();
	const type = entity.getType();
	if( type === 'IMAGE'){
		return <img src={src} />;
	}	else if (type === 'VIDEO') {
		return <video controls src={src} />;
	} else if (type === 'AUDIO') {
		return <audio controls src={src} />;
	}else {
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