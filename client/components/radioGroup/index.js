import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
let multiChoose = [];

function getSelectedChbox(frm) {
	var selchbox = [];// array that will store the value of selected checkboxes
	// gets all the input tags in frm, and their number
	var inpfields = frm.getElementsByTagName('input');
	var nr_inpfields = inpfields.length;
	// traverse the inpfields elements, and adds the value of selected (checked) checkbox in selchbox
	for(var i=0; i<nr_inpfields; i++) {
		if(inpfields[i].type == 'checkbox' && inpfields[i].checked == true) selchbox.push(inpfields[i].value);
	}
	return selchbox;
} 

class RadioGroup extends Component {
	constructor(){
		super();
		this.state = {
			customValue: '',
			customDisable: true
		}
	}
	componentDidMount() {
		this.refs.customInput.focus();
	}
	
	handleChange(index,e) {
		let returnValue;
		if( !this.state.customDisable ) this.setState({ customDisable: true});
		if( !this.props.checkBox ) {
			this.props.onSelected(e.target.value, index+1);
		}else if( this.props.checkBox){
			returnValue = getSelectedChbox(this.refs.main);
			this.props.onSelected(returnValue);
		}
		
	}
	customChange(e) {
		this.setState({
			customValue: e.target.value
		})	
	}
	customChoose(e) {
		let that = this;
		if(e.target.value.length > 0) this.handleChange(this.props.group, e);
		
		this.setState({
			customDisable: !e.target.checked
		})
		
		setTimeout(function(){
			that.refs.customInput.focus();
		},100);
	}
	handleBlur() {
		if (this.props.checkBox) {
			this.props.onSelected(getSelectedChbox(this.refs.main));
		}else {
			this.props.onSelected(this.state.customValue, this.props.group.length + 1);
		}
	}
	render() {
		let that = this;
		let type = this.props.checkBox ? 'checkbox' : 'radio'; 
		
		return (
			<div className={this.props.className} ref="main">
				{this.props.group.map(function (value, index) {
					return(
					<div key={index} style={{display: 'inline-block'}}>
						<input
							type={type}
							id={that.props.name + 'radio' + index}
							name={that.props.name}
							value={value} 
							onChange={that.handleChange.bind(that,index)}
							defaultChecked={that.props.checkedIndex-1 === index || that.props.checkedValue === value ? 'checked' : null } />
						<label htmlFor={that.props.name + 'radio' + index}>{value}</label>
					</div>
					);
				})}
				{this.props.custom && 
					<div style={{display: 'inline-block'}}>
						<input 
							id={that.props.name + 'custom'}
							type={type}
							value={this.state.customValue}
							name={that.props.name}
							onChange={this.customChoose.bind(this)} />
						<label htmlFor={that.props.name + 'custom'}>自訂</label>
						<input
							type="text" 
							ref="customInput"
							onFocus={console.log("focus")}
							value={this.state.customValue} 
							onChange={this.customChange.bind(this)} 
							disabled={this.state.customDisable}
							onBlur={this.handleBlur.bind(this)}/>
						
					</div>
				}
				{this.props.errorMessage && <div styleName="error">{this.props.errorMessage}</div>}
			</div>
		);
	}
}

export default connect()(CSSModules(RadioGroup,style,{allowMultiple:true}));