import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';


class TextFeild extends Component {
	constructor(props){
		super(props); 
		this.state = {
			data: this.props.value,
			errorMessage: ''
		}
		this._onChange = this._onChange.bind(this);
		this._onBlur = this._onBlur.bind(this);
	}
	componentDidMount() {
		if( this.props.allowMultiLine ){
			let target = ReactDOM.findDOMNode(this.refs.textarea);
			target.style.height = Math.max(target.scrollHeight,target.clientHeight) + 'px';
			this.initHeight = Math.max(target.scrollHeight,target.clientHeight);
		}
		
	}
	_onBlur(e){
		let validObject = {};
		validObject[this.props.name] = e.target.value;
		
		let validResult = this.props.validator.validate(validObject);
		
		if(validResult.status) {
			this.setState({
				errorMessage: ''
			})
		}else {
			this.setState({
				errorMessage: '使用者名稱' + validResult.errorMessage[this.props.name]
			})
		}
		
		this.props.onBlur(this.props.name, e);
		
	}
	_onChange(e){
		if( this.props.allowMultiLine ) {
			e.target.style.height = Math.max(e.target.scrollHeight,e.target.clientHeight,this.initHeight) + 'px';
		}
		if( this.props.maxWords && e.target.value.length > this.props.maxWords ) {
			this.setState({
				errorMessage: '超過指定字數'
			})
		}else {
			this.setState({
				data:  e.target.value
			})	
		}
		
		this.props.onChange(this.props.name, e);
	}
	componentWillReceiveProps(nextProps) {
		
		
	}
	render() {
		const option = {
			onBlur: this._onBlur,
			onChange: this._onChange,
			value: this.state.data,
			placeholder: this.props.placeHolder,
		}
		let status = '';
		if( this.state.errorMessage.length > 0 ) status = 'error ';
		return (
			<div>
				<div styleName={status + 'input'} className={this.props.className}>
					{ this.props.allowMultiLine ? 
						<textarea {...option} 
							ref="textarea"/>
						:
						<input {...option} />      
					}
					{ this.props.maxWords && <span styleName="maxWord">{this.state.data.length}/{this.props.maxWords}</span>}
					<div styleName="errorMessage">{ this.state.errorMessage }</div>
				</div>
			</div>
		);
	}
}


export default CSSModules(TextFeild,style,{allowMultiple:true});