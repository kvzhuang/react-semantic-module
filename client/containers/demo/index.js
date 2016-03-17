import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';
import DropdownMenu from 'client/components/dropdownMenu';
import DropdwonItem from 'client/components/dropdownMenu/item';

import LightBox from 'client/components/lightbox';

class Demo extends Component {
	constructor(){
		super();
	}
	render() {
		let lightboxObtion = {
			submit: {
				text: '確定',
				action: this.submit
			},
			cancel: {
				text: 'Cancel',
			},
			closeIcon: true,
			title: '野豬騎士來囉'
		}
		return (
			<div>
				Welcome
			</div>
		);
	}
}

export default connect()(CSSModules(Demo,style,{allowMultiple:true}));