import React, { Component, PropTypes } from 'react';
import { Entity } from 'draft-js';
import CSSModules from 'react-css-modules';
import style from './style.css';

import { getFileUrl } from '../../../utils/fileUpload.js';

class CustomComponent extends Component  {
	
	constructor(props){
		super(props);

		const entity = Entity.get(props.block.getEntityAt(0));
		const entityProps =  entity.getData();
		const type = entity.getType();

		this.state = {
			props: entityProps,
			type: type
		}
	}

	handleClick(e){
		this.props.blockProps.onRequestRemove(this.props.block.getKey());
	}

	componentWillMount() {
		
		let that = this;
		if( !this.state.props.src && this.state.props.fileId ) {
			getFileUrl(this.state.props.fileId).done(function(res){
				that.state.props.src = res[0].url[0];
				that.setState({
					props: that.state.props
				});
			})
		}
	}
	
	render(){
		const props = this.state.props;
		const type = this.state.type;
		
		if( !props.fakeSrc ) props.fakeSrc = props.src;
		
		switch(type) {
			case 'IMAGE': 
				return <div styleName="block">
					{ props.loading ? 
						<div styleName="mask-block"><img styleName="article-image"src={props.fakeSrc} /><div styleName="mask"></div></div> : 
						<div>
							<div styleName="close" onClick={this.handleClick.bind(this)}></div>
							<img styleName="article-image"src={props.fakeSrc} />
						</div>
					}		
					</div>;
			case 'VIDEO':
				return <div styleName="block">
				{ props.loading? <div styleName="loading-preset"><div styleName="play-icon video"></div></div> : 
					<div>
						<div styleName="close" onClick={this.handleClick.bind(this)}></div>
						<video controls src={props.src} />
					</div>
				}
				</div>;
			case 'AUDIO':
				return <div styleName="block">
				{ props.loading? <div styleName="loading-preset audio"><div styleName="play-icon audio"></div></div> : 
					<div styleName="mid-block">
						<div styleName="close" onClick={this.handleClick.bind(this)}></div>
						<div styleName="title">{props.name}</div>
						<audio controls src={props.src} />
					</div>
				}
				</div>;
			case 'HYPERLINK':
				return <div> {props.src} </div>;
			case 'YOUTUBE':
				return <div styleName="block">
					<div styleName="close" onClick={this.handleClick.bind(this)}></div>
					<a href={props.text } target="_blank">{props.text}</a>
					<div>
					<iframe width="476" height="267.5"
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