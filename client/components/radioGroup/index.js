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
		if(inpfields[i].checked == true) selchbox.push(inpfields[i].value);
	}
	//multiChoose = selchbox;
	return selchbox;
} 

class RadioGroup extends Component {
	constructor(props){
		super(props);
		this.state = {
			customValue: '',
			customDisable: true,
			errorMessage: props.errorMessage
		}
	}
	handleChange(index,e) {
		multiChoose = getSelectedChbox(this.refs.main);
		if( multiChoose.length > this.props.maxChoose ) {
			e.target.checked = false;
			this.setState({ errorMessage: '最多選擇'+this.props.maxChoose+'個項目' });
		}else {
			this.setState({ errorMessage: ''});
			this.props.onSelected(multiChoose,index+1);
		}		 
	}
	customChange(e) {
		this.setState({
			customValue: e.target.value
		})	
	}
	customChoose(e) {
		let that = this;
		this.handleChange(this.props.group.length, e);
		this.setState({
			customDisable: !e.target.checked,
		}) 
		
		setTimeout(function(){
			that.refs.customInput.focus();
		},100);
		
	}
	handleBlur() {
		this.props.onSelected(getSelectedChbox(this.refs.main),this.props.group.length+1);
	}
	componentWillReceiveProps(nextProps) {
		if( this.state.errorMessage !== nextProps.errorMessage ) {
			this.setState({ errorMessage: nextProps.errorMessage });
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
							value={this.state.customValue} 
							onChange={this.customChange.bind(this)} 
							disabled={this.state.customDisable}
							onBlur={this.handleBlur.bind(this)}/>
						
					</div>
				}
				{this.state.errorMessage && <div styleName="error">{this.state.errorMessage}</div>}
			</div>
		);
	}
}
RadioGroup.defaultProps = {
	errorMessage: '',
	maxChoose: 99
}
export default connect()(CSSModules(RadioGroup,style,{allowMultiple:true}));