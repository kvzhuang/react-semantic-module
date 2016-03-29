import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import List from './list';
import ReactDOM from 'react-dom';

let target;
let list = [];

class DropdownList extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
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
	
	onSelect(value) {
		this.setState({
			open: false,
			choosen: value
		})
		this.props.onSelected(value);
	}
	
    render(){
		let that = this;
        return(
            <div> 
				<input type="button" styleName="listInput" value={this.state.choosen} onClick={this.toggleOpen.bind(this)} />
				{this.state.open && 
				<List type={this.state.posType}
				      open={this.state.open} 
                      clickAway={this.toggleOpen} 
					  getListDom={this.getListDom}> 
					  { this.props.listContent.map(function (value, index) {
						  return (
							  <li onClick={that.onSelect.bind(that, value)}>{value}</li>
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