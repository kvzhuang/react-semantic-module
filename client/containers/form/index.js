import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Validators from 'util/validator';
import TextField from 'client/components/textfeild';

var config = {
			'data': {
				'username' : [ 'notEmpty', {maxLength: 5}, 'isName'],
				'email':['notEmpty','isEmail'],
				'url':['notEmpty','isURL'],
				'editor':['notEmpty']
			},
			'customValidator' : {
				dontUseThis: function(value){
				}
			}
		}
let val = new Validators(config);	

class Form extends Component {
	constructor(){
		super();
		this.state = {
			data: {
				username:"",
				editor:"野豬騎士來囉野"
			}		
		}
	}
	onChange(key,e) {
			
	}
	onBlur(key,e){
		this.state.data[key] = e.target.value;
		this.setState({
			data: this.state.data
		})
	}
	render() {
		return (
			<div>
				<TextField
					name="username" 
					value={this.state.data.username}
					onChange={this.onChange.bind(this)}
					onBlur={this.onBlur.bind(this)}
					placeHolder="請輸入"
					styleName="input1"
					validator={val}
					maxWords={10}/>
				<TextField
					name="editor" 
					value={this.state.data.editor}
					onChange={this.onChange.bind(this)}
					onBlur={this.onBlur.bind(this)}
					placeHolder="請輸入"
					styleName="textarea"
					validator={val}
					allowMultiLine={true}
					maxWords={50}/>
			</div>
		);
	}
}

export default connect()(CSSModules(Form,style,{allowMultiple:true}));