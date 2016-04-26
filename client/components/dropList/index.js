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
			choosen: this.props.defaultValue || '選單項目'
		}
		this.toggleOpen = this.toggleOpen.bind(this);
    }
	getChildContext() {
		return { 
			toggleOpen: this.toggleOpen,
			getSelect: this.updateSelected
		};
	}
	
	toggleOpen() {
		this.setState({
			open: !this.state.open
		})
	}
	
	onSelect(data) {
		this.setState({
			open: false,
			choosen: data.label
		}) 
		this.props.onSelected(data);
	}
	
    render(){
		let that = this;
        return(
            <div> 
				<input type="button" styleName="listInput" value={this.state.choosen} onClick={this.toggleOpen.bind(this)} />
				{this.state.open && 
				<List type={this.state.posType}
				      open={this.state.open} 
                      clickAway={this.toggleOpen} > 
					  { this.props.listContent.map(function (data, index) {
						  return (
							  <li key={index} onClick={that.onSelect.bind(that, data)}>{data.label}</li>
							);
					  })}  
                </List>
				}               
            </div>
        );
    }
}

DropdownList.childContextTypes = {
	toggleOpen: React.PropTypes.func,
	getSelect: React.PropTypes.func
}

export default CSSModules(DropdownList,style,{allowMultiple:true});