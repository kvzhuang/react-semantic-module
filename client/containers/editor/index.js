import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import LightBox from 'client/components/lightbox';
//import html from 'doc/switches.md';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
//import { RadioGroup } from 'c_wap_module';
import Editor from 'client/components/editor';
import html from 'doc/editor.md';
import {
	convertToRaw,
} from 'draft-js';

import $ from 'jquery';

import testData from './test.json';
console.log(testData);

let metion = [];

/*$.each(testData.response, function(index,value){
	let item = {link: value.pid, name: value.userName, avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'};
	metion.push(item);
})*/

console.log(metion);
import { fromJS } from 'immutable';




const mentions = fromJS(metion);

class EditorPage extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			rawStateString: null,
			HTMLString: null,
			rawState: null,
			uploading: false
		}
		this.onChange = (rawState) => this._onChange(rawState);
		this.toggle = () => this._toggle();
		this.onRequestSearch = (value) => this._onRequestSearch(value);
	}
	_onChange (contentState) {
		this.contentState = contentState;
		this.rawState= convertToRaw(contentState);
	}
	_toggle(){
		let html;
		if( !this.state.uploading ){
			if( this.contentState ) {
				html = stateToHTML(this.contentState);
			}
			this.setState({ 
				open: !this.state.open,
				rawStateString: JSON.stringify(this.rawState),
				rawState: this.rawState,
				HTMLString: html,
				HTMLtoState: convertToRaw(stateFromHTML(html))
			});
		}
		
	}
	componentDidMount() {
		
	}
	onUploadStatusChange(status){
		this.setState({
			uploading: status.uploading
		})
	}
	/*_onRequestSearch(value) {

	}*/
	render() {
		let option = {
			submit: {
				text: '完成',
				action: this.toggle
			},
			 closeIcon: true,
		}
		return (
			<div>
				<h3>Rich Editor</h3>
				<button styleName="viewButton" onClick={this.toggle}>發表文章</button>
				
				{ this.state.open && 
					<LightBox option={option}
						  onClose={this.toggle.bind(this)}>
						<div styleName="editorBlock">
							<Editor onChange={this.onChange} 
									onUploadStatusChange={this.onUploadStatusChange.bind(this)}/>
						</div>
					</LightBox>	
				}
				{ this.state.rawStateString &&
					<div>			
						<h3> SHOW JSON RESULT </h3>
						<div className="content">
							<p>{ this.state.rawStateString }</p>
						</div>
						<h3> Convert from JSON </h3>
						<div className="content">
							<Editor content={this.state.rawState}
									mentions={mentions}
									readOnly={true}/>
						</div>
						<h3> SHOW HTML RESULT </h3>
						<div className="content">
							<p>{ this.state.HTMLString }</p>
						</div>
						<h3> Convert from HTML </h3>
						<div className="content">
							<Editor content={this.state.HTMLtoState}
									mentions={mentions}
									readOnly={true}/>
						</div>
					</div>
				}
				<div className="content" dangerouslySetInnerHTML={{__html: html}}>
					
				</div>
			</div>
			
		);
	}
}

export default connect()(CSSModules(EditorPage,style,{allowMultiple:true}));