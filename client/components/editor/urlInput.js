import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

import TextField from '../textfeild';

class urlInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
		this.onChange = (e) => this.setState({ data: e.target.value });
	}
	_onKeyDown (e){
		if (e.which === 13) {
			this.props.onKeyDown(e);
		}
	} 
	render (){
		return(
			<input 
				onKeyDown={this._onKeyDown.bind(this)} 
				onChange={this.onChange} 
				styleName="linkInput" 
				type="text"/>
		);
	}
	
}

export default CSSModules(urlInput, style, { allowMultiple: true });