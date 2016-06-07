import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

//import html from 'doc/switches.md';

//import { RadioGroup } from 'c_wap_module';
import Editor from 'client/components/editor';
class EditorPage extends Component {
	constructor(){
		super();
		this.state = {
		}
	}
	render() {
		return (
			<div>
				<h3>Rich Editor</h3>
				<div styleName="editorBlock">
					<Editor />
				</div>
			</div>
			
		);
	}
}

export default connect()(CSSModules(EditorPage,style,{allowMultiple:true}));