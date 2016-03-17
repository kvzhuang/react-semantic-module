import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';
import DropdownMenu from 'client/components/dropdownMenu';
import DropdwonItem from 'client/components/dropdownMenu/item';

class DropdownPage extends Component {
	constructor(){
		super();
		this.state = {
			dropOpen: false,
			lightbox: false
		}
	}
	componentDidMount() {
		console.log(this.refs);   
	}
	toggleDrop(e){
		this.setState({
			dropOpen: !this.state.dropOpen
		})
	}
	submit(e) {
		console.log("submit");
	}
	action(e) {
		console.log("this is a action!");
	}
	render() {
		return (
			<div>
				<Button label="open menu"
						focus={true}
						hover={true}
						ref="button"
						onClick={this.toggleDrop.bind(this)}
				/>
				<DropdownMenu open={this.state.dropOpen} 
							  toggle={this.toggleDrop.bind(this)}
							  styleName="listStyle">
					<DropdwonItem action={this.action.bind(this)}>關於</DropdwonItem>
					<DropdwonItem>關於</DropdwonItem>
					<DropdwonItem>關於</DropdwonItem>
				</DropdownMenu>
			</div>
		);
	}
}

export default connect()(CSSModules(DropdownPage,style,{allowMultiple:true}));