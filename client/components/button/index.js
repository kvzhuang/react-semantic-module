import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Button extends Component {
	constructor(props){
		super(props);
		this.state = {
			newLabel : null,
			focus: false
		} 
	}
	handleClick(){
		this.props.onClick();
		if ( this.props.onFocusLabel && !this.state.focus ) {
			this.setState({ newLabel: this.props.onFocusLabel, focus: true });
		}else {
			this.setState({ newLabel: null, focus: false });
		}
	}
	handleBlur(){
	}
	render() {
		return (
			<button 
					onClick={this.handleClick.bind(this)}
					onBlur={this.handleBlur.bind(this)} >
				{ this.state.newLabel || this.props.label }
			</button>
		);
	}
}


export default CSSModules(Button,style,{allowMultiple:true});