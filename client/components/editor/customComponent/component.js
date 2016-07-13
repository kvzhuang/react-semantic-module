import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import CSSModules from 'react-css-modules';
import style from './style.css';

class CustomComponent extends Component  {
	
	handleClick(e){
		console.log("click");
		console.log(this.props);
		this.props.blockProps.onRequestRemove(this.props.block.getKey());
	}

	render(){

		const entity = Entity.get(this.props.block.getEntityAt(0));
		const props =  entity.getData();
		const type = entity.getType();
		console.log(props);
		switch(type) {
			case 'IMAGE': 
				return <div styleName="block">
					{ props.loading ? 
						<div styleName="mask-block"><img styleName="article-image"src={props.fakeSrc} /><div styleName="mask"></div></div> : 
						<div><div styleName="close" onClick={this.handleClick.bind(this)}></div>
						<img styleName="article-image"src={props.fakeSrc} /></div>
					}		
					</div>;
			case 'VIDEO':
				return <div>
				{ props.loading? <div styleName="loading-preset">loading...</div> : 
					<video controls src={props.src} />
				}
				</div>;
			case 'AUDIO':
				return <div>
				{ props.loading? <div styleName="loading-preset">loading...</div> : 
					<audio controls src={props.src} />
				}
				</div>;
			case 'HYPERLINK':
				return <div> {props.src} </div>;
			case 'YOUTUBE':
				return <div styleName="block">
					<div styleName="close" onClick={this.handleClick.bind(this)}></div>
					<a href={props.text } target="_blank">{props.text}</a>
					<div>
					<iframe width="420" height="315"
						src={"https://www.youtube.com/embed/" + props.file}>
						</iframe>
					</div>
				</div>
			default:
				return false;
		}
	}
};
export default CSSModules(CustomComponent,style,{allowMultiple:true});
/*
class ImageComponent extends Component {
	render(){
		console.log(this.props);
		return <img src={this.props.src} contentEditable={false}/>;
	}
}

export default ImageComponent;*/