import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import LightBox from 'client/components/lightbox';
//import html from 'doc/switches.md';

//import { RadioGroup } from 'c_wap_module';
import Editor from 'client/components/editor';
import html from 'doc/editor.md';
console.log(Editor);

class EditorPage extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			rawStateString: null,
			rawState: null
		}
		this.onChange = (rawState) => this._onChange(rawState);
		this.toggle = () => this._toggle();
	}
	_onChange (rawState) {
		this.rawState= rawState;
	}
	_toggle(){
		this.setState({ 
			open: !this.state.open,
			rawStateString: JSON.stringify(this.rawState),
			rawState: this.rawState
		 });
	}
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
							<Editor onChange={this.onChange}/>
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
							<Editor content={this.state.rawState}/>
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