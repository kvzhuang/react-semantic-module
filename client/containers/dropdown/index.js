import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';
import DropdownMenu from 'client/components/dropdownMenu';
import Target from 'client/components/dropdownMenu/target';
import MenuItem from 'client/components/dropdownMenu/item';

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
	
	onSelected(props) {
		console.log(props);
	}
	 
	render() {
		return (
			<div>
				<DropdownMenu
					onSelected={this.onSelected.bind(this)}
					styleName="listStyle">
					<Target><button>OPEN</button></Target>
					<MenuItem value="關於" index={1}>關於</MenuItem>
					<MenuItem value="編輯" index={2}>編輯</MenuItem>
					<MenuItem value="其他" index={3}>其他</MenuItem>
				</DropdownMenu>
			</div>
		);
	}
}

export default connect()(CSSModules(DropdownPage,style,{allowMultiple:true}));