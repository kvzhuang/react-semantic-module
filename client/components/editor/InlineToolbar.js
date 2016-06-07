import React, { Component, PropTypes } from 'react';
import ToolbarIcon from './ToolbarIcon';
import CSSModules from 'react-css-modules';
import style from './style.css';
import LinkInput from './urlInput';

const INLINE_STYLES = [
	{ icon: 'fa fa-bold', style: 'BOLD' },
	{ icon: 'fa fa-italic', style: 'ITALIC' },
	{ icon: 'fa fa-link', style: 'LINK' }
];


class InlineToolBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urlInput: false
		}
	}
	
	openLink(){
		this.setState({ urlInput: true });		
	}
	onLinkKeyDown(value){
		this.props.onLink(value);
	}
	render(){
		const 
		{
			editorState,
			onToggle,
			position
		} = this.props;
		const currentStyle = editorState.getCurrentInlineStyle();
		return (
			<div
				styleName="toolbar"
				id="inlineToolbar"
				style={position}
				>
				<ul styleName="toolbar-icons" id="toolbar-icon">
					{INLINE_STYLES.map(type =>
						<ToolbarIcon
							key={type.label || type.icon}
							active={currentStyle.has(type.style) }
							label={type.label}
							icon={type.icon}
							onToggle={onToggle}
							onLink={this.openLink.bind(this)}
							style={type.style}
							/>
					) }
					{ 
						this.state.urlInput &&  
						<LinkInput onKeyDown={this.onLinkKeyDown.bind(this)}/>
					}
				</ul>
				
			</div>
		);
	}
}

export default CSSModules(InlineToolBar, style, { allowMultiple: true });