import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import List from './list';
import ReactDOM from 'react-dom';

class DropdownList extends Component{
    constructor(props) {
        super(props);
		this.state = {
			open: false,
			selected: props.defaultIndex || null
		}
		this.toggleOpen = this.toggleOpen.bind(this);
    }
	
	toggleOpen() {
		if( !this.props.disabled ) {
			this.setState({
				open: !this.state.open
			})
		}
		
	}
	
	onSelect(data, index) {
		
		this.setState({
			open: false,
			selected: index+1
		})
		data.index = index+1; 
		
		const { onSelected = _.noop } = this.props;
		onSelected(data);
	}
	
    render(){
		let that = this;
		let status = '';
		if( this.props.disabled ) status = 'disabled';
		else if ( this.state.open ) status='active'; 
		
        return(
            <div styleName="droplist" className={this.props.className}> 
				<div onClick={this.toggleOpen.bind(this)} className="Droplist_listInput" styleName={'listInput '+status} style={{ width: this.props.width }}>
					{
						(() => {
							if( this.state.selected ) {
								let defaultSelect = this.props.listContent[this.state.selected-1];
								if(defaultSelect.iconFont) return <div style={{ color: "#333" }}><i className={"fa " + defaultSelect.iconFont } aria-hidden="true"/>{defaultSelect.label}</div>
								else return <span style={{ color: "#333" }}>{ defaultSelect.label } </span>;	 
							}else {
								return this.props.placeHolder; 
							} 
						})()
					}
					<span aria-hidden="true" styleName="caret-down"></span> 
				</div>
				{this.state.open && 
				<List type={this.state.posType}
				      open={this.state.open} 
                      clickAway={this.toggleOpen}
					  width={this.props.width} > 
					  { this.props.listContent.map(function (data, index) {
						  return (
							  <li key={index} onClick={that.onSelect.bind(that, data, index)}>
								  { typeof(data.iconFont) !== 'undefined' && <i className={"fa " + data.iconFont } aria-hidden="true"  /> }								  	
								  {data.label}
							  </li>
							);
					  })}  
                </List>
				}               
            </div>
        );
    }
}
DropdownList.defaultProps = {
	placeHolder: '請選擇',
	listContent: [],
	disabled: false,
}
export default CSSModules(DropdownList,style,{allowMultiple:true});