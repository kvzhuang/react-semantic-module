import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

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
		if( !this.state.customDisable ) this.setState({ customDisable: true});
		this.props.onSelected(index+1, e.target.value);
	}
	customChange(e) {
		this.setState({
			customValue: e.target.value
		})	
	}
	customChoose() {
		let that = this;
		this.setState({
			customDisable: false
		})
		setTimeout(function(){
			that.refs.customInput.focus();
		},100);
		
		
	}
	render() {
		let that = this;
		if( !this.state.customDisable ) { console.log(this.refs.customInput); }
		return (
			<div className={this.props.className}>
				{this.props.group.map(function (value, index) {
					return(
					<div key={index} style={{display: 'inline-block'}}>
						<input
							type="radio"
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
							type="radio"
							value="自訂"
							name={that.props.name}
							onChange={this.customChoose.bind(this)} />
						<label htmlFor={that.props.name + 'custom'}>自訂</label>
						<input
							type="text" 
							ref="customInput"
							onFocus={console.log("focus")}
							value={this.state.customValue} 
							onChange={this.customChange.bind(this)} 
							disabled={this.state.customDisable}/>
						
					</div>
				}
			</div>
		);
	}
}

export default connect()(CSSModules(RadioGroup,style,{allowMultiple:true}));