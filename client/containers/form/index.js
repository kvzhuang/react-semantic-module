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
				job:"",
				editor:"野豬騎士來囉野",
				ACData: []
			}		
		}
	}
	onChange(key,e) {
		/* call AC api and get ACDATA*/
		if( key === 'job') {
			if ( e.target.value.length <= 0 ) {
				this.setState({ ACData: [] });
			}else {
			this.setState({
				ACData: [
					{
						id: 1,
						value: 'aa',
						info: ''
					},
					{
						id: 2,
						value: 'aaa',
						info: ''
					},
					{
						id: 3,
						value: 'aaaa',
						info: ''
					},
					{
						id: 4,
						value: 'aabbc',
						info: ''
					},
					{
						id: 5,
						value: 'aasdas',
						info: ''
					},
					{
						id: 6,
						value: 'aasdda',
						info: ''
					},
					{
						id: 7,
						value: 'aaaaaaaaa',
						info: ''
					},
					{
						id: 8,
						value: 'aaddssaasd',
						info: ''
					},
					{
						id: 9,
						value: 'aaasdddas',
						info: ''
					},
					{
						id: 10,
						value: 'dsaddddaa',
						info: ''
					},
				]			
			})
			}
		}
		
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
				<TextField
					name="job" 
					value={this.state.data.job}
					onChange={this.onChange.bind(this)}
					onBlur={this.onBlur.bind(this)}
					placeHolder="AC測試"
					styleName="input1"
					maxWords={10}
					ACData={this.state.ACData}>
				</TextField>
			</div>
		);
	}
}

export default connect()(CSSModules(Form,style,{allowMultiple:true}));