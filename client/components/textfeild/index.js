import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';

let ACStyle = {};

class TextFeild extends Component {
	constructor(props){
		super(props); 
		this.state = {
			data: this.props.value,
			errorMessage: this.props.errorMessage,
			ACData: this.props.ACData
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
		
		let MainElement = this.refs.textFeildMain.getBoundingClientRect();
		ACStyle.width = MainElement.width;
		//ACStyle.maxHeight = window.innerHeight - MainElement.top - MainElement.height - 10;
	}
	_onBlur(e){
		if( this.props.validator ) {
			let validObject = {};
			validObject[this.props.name] = e.target.value;
			
			let validResult = this.props.validator.validate(validObject);
			if(validResult.status) {
				this.setState({
					errorMessage: ''
				})
			}else {
				this.setState({
					errorMessage:validResult.errorMessage[this.props.name]
				})
			}
		}
		let that = this;
		setTimeout(function(){
			that.props.onBlur(that.props.name, that.state.data);
		},200);
		
		
	}
	_onChange(e){
		if( this.props.allowMultiLine ) {
			e.target.style.height = Math.max(e.target.scrollHeight,e.target.clientHeight,this.initHeight) + 'px';
		}

		if( this.props.maxWords && e.target.value.length > this.props.maxWords ) {
			this.setState({
				errorMessage: '超過指定字數',
				ACData: []
			})
		}else {
			this.setState({
				data:  e.target.value,
				errorMessage: ''
			})
			this.props.onChange(this.props.name, e.target.value);	
		}
		
		
	}
	
	
	select(value,index) {
		this.setState({
			data: value,
			errorMessage: '',
			ACData: []
		})
		this.props.onSelected(value,index+1);
	}
	
	componentWillReceiveProps(nextProps) {
		if( this.state.data !== nextProps.value && this.props.value !== nextProps.value) {
			this.setState({ data: nextProps.value });
		}
		if( this.state.ACData !== nextProps.ACData && this.props.ACData !== nextProps.ACData) {
			this.setState({ ACData: nextProps.ACData });
		}
		if( this.props.errorMessage !== nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage) {
			this.setState({ errorMessage: nextProps.errorMessage });
		}
	}
	
	render() {
		const option = {
			onBlur: this._onBlur,
			onChange: this._onChange,
			value: this.state.data,
			placeholder: this.props.placeHolder,
		}
		let status = '';
		let that = this;
		if( this.state.errorMessage.length > 0 ) status = 'error ';
		return (
			<div className={this.props.className}>
				<div styleName={status + 'input'}  ref="textFeildMain">
					{ this.props.allowMultiLine ? 
						<textarea {...option} 
							ref="textarea"/>
						:
						<input {...option} />      
					}
					{ this.props.maxWords && <span styleName="maxWord">{this.state.data.length}/{this.props.maxWords}</span>}
					<div styleName="errorMessage">{ this.state.errorMessage }</div>
				</div>
				{ this.state.ACData && this.state.ACData.length > 0  && 
					<div style={ACStyle} styleName="AClist">
						{ this.state.ACData.map(function(item,index){
							return (
								<li key={index} onClick={this.select.bind(this, item.value, index)}>{item.value}</li>
							);
						},this) }
					</div>	
				}
			</div>
		);
	}
}
TextFeild.defaultProps = {
	errorMessage: '',
	data: ''
}

export default CSSModules(TextFeild,style,{allowMultiple:true});