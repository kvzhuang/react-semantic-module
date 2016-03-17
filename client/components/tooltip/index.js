import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Tooltip extends Component {
	constructor(props){
		super(props); 
	}
	render() {
		return (
			<div 
                className={this.props.icon} 
                data-tooltip={this.props.hint}>
			</div>
		);
	}
}


export default CSSModules(Tooltip,style,{allowMultiple:true});