import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import List from 'client/components/dropdownMenu/list';
import ReactDOM from 'react-dom';
import Target from './target';

let target;
let list = [];
let targetStyle;

let ListNode, ArrowNode, TrueHeight, InitialProp;

class DropdownMenu extends Component{
    constructor(props) {
        super(props);
		this.state = {
			open: false
		}
		this.toggleOpen = this.toggleOpen.bind(this);
		this.updateSelected = this.updateSelected.bind(this);
    }

	componentWillMount() {
		let that = this;
		React.Children.map(this.props.children, function(child,index){
			if( child.type === Target ) {
				target = React.cloneElement(child);
			}else {
				list.push(React.cloneElement(child));
			}
		});
	}
	
	getChildContext() {
		return { 
			toggleOpen: this.toggleOpen,
			getSelect: this.updateSelected,
			getThisDOM: this.getChildDOM
		};
	}
	
	getChildDOM(DOM) {
		targetStyle = DOM.getBoundingClientRect();
	}
	
	toggleOpen() {
		if ( !this.state.open ) {
			this.testPostiion();
		}
		
		this.setState({
			open: !this.state.open
		})
	}
	
	updateSelected(props) {
		this.props.onSelected(props);
	}
	
	testPostiion(){
		let ContainerProp = ListNode.getBoundingClientRect();
		let OrginLeft = (targetStyle.width / 2) - (ContainerProp.width / 2);
		let ContainerLeft = OrginLeft;
		
		if (OrginLeft + targetStyle.left + targetStyle.width < 0 ) {
			ContainerLeft = 0;
		}else if (targetStyle.left + ( targetStyle.width / 2 ) + (ContainerProp.width / 2) > window.innerWidth ) {
			ContainerLeft =  window.innerWidth - ContainerProp.width - 10 - targetStyle.left;
		}

		ListNode.style.left = ContainerLeft + 'px';
		ArrowNode.style.marginLeft = OrginLeft - ContainerLeft - 12 + 'px';
		
		if( InitialProp.top + TrueHeight <= window.innerHeight ) {
			ListNode.style.bottom = "";
			ArrowNode.style.bottom = "";
			ArrowNode.style.top = 0;
			ArrowNode.className = style.arrow;
		}else if ( ContainerProp.top + TrueHeight > window.innerHeight ) {
			ListNode.style.bottom =  targetStyle.height + 15 + 'px';
			ArrowNode.style.bottom = -24 + 'px';
			ArrowNode.style.top = 'initial';
			ArrowNode.className += " "+style.top;
		}
	}
	
	getListDom(Node, Arrow, trueHeight) {

		if (!ListNode || !ArrowNode || !TrueHeight) {
			ListNode = Node;
			ArrowNode = Arrow;
			TrueHeight = trueHeight;
			InitialProp = ListNode.getBoundingClientRect();
		}	
	}
	
	componentWillUnmount(){
		ListNode = null;
		ArrowNode = null;
		TrueHeight = null;
		InitialProp = null;
		list = [];
	}
	
    render(){
		
        return(
            <div className={this.props.className} styleName="root"> 
				{target}
				<List 
				      open={this.state.open} 
                      clickAway={this.toggleOpen} 
                      listStyle={this.props.className}
					  getListDom={this.getListDom}
					  content={list}
					  targetStyle={targetStyle}>       
                </List>
            </div>
        );
    }
}

DropdownMenu.childContextTypes = {
	toggleOpen: React.PropTypes.func,
	getSelect: React.PropTypes.func,
	getThisDOM: React.PropTypes.func
}

export default CSSModules(DropdownMenu,style,{allowMultiple:true});