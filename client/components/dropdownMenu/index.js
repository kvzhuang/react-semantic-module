import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import List from 'client/components/dropdownMenu/list';
import ReactDOM from 'react-dom';
import Target from './target';


class DropdownMenu extends Component{
    constructor(props) {
        super(props);
		this.state = {
			open: false
		}
		this.toggleOpen = this.toggleOpen.bind(this);
		this.updateSelected = this.updateSelected.bind(this);
		this.getChildDOM = this.getChildDOM.bind(this);
		this.target = null;
		this.list = [];
		this.targetStyle = null;
		this.ListNode = null;
		this.ArrowNode = null;
		this.TrueHeight = null;
		this.InitialProp = null;
    }

	componentWillMount() {
		let that = this;
		React.Children.map(this.props.children, function(child,index){
			if( child.type === Target ) {
				that.target = React.cloneElement(child);
			}else {
				that.list.push(React.cloneElement(child));
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
		this.targetStyle = DOM.getBoundingClientRect();
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
		let ContainerProp = this.ListNode.getBoundingClientRect();
		let OrginLeft = (this.targetStyle.width / 2) - (ContainerProp.width / 2);
		let ContainerLeft = OrginLeft;
		
		if (OrginLeft + this.targetStyle.left + this.targetStyle.width < 0 ) {
			ContainerLeft = 0;
		}else if (this.targetStyle.left + ( this.targetStyle.width / 2 ) + (ContainerProp.width / 2) > window.innerWidth ) {
			ContainerLeft =  window.innerWidth - ContainerProp.width - 10 - this.targetStyle.left;
		}

		this.ListNode.style.left = ContainerLeft + 'px';
		this.ArrowNode.style.marginLeft = OrginLeft - ContainerLeft - 12 + 'px';
		
		if( this.InitialProp.top + this.TrueHeight <= window.innerHeight ) {
			this.ListNode.style.bottom = "";
			this.ArrowNode.style.bottom = "";
			this.ArrowNode.style.top = 0;
			this.ArrowNode.className = style.arrow;
		}else if ( ContainerProp.top + this.TrueHeight > window.innerHeight ) {
			this.ListNode.style.bottom =  this.targetStyle.height + 15 + 'px';
			this.ArrowNode.style.bottom = -24 + 'px';
			this.ArrowNode.style.top = 'initial';
			this.ArrowNode.className += " "+style.top;
		}
	}
	
	getListDom(Node, Arrow, trueHeight) {

		if (!this.ListNode || !this.ArrowNode || !this.TrueHeight) {
			this.ListNode = Node;
			this.ArrowNode = Arrow;
			this.TrueHeight = trueHeight;
			this.InitialProp = this.ListNode.getBoundingClientRect();
		}	
	}
	
	componentWillUnmount(){
		this.ListNode = null;
		this.ArrowNode = null;
		this.TrueHeight = null;
		this.InitialProp = null;
		this.list = [];
	}
	
    render(){
		
        return(
            <div className={this.props.className} styleName="root"> 
				{this.target}
				<List 
				      open={this.state.open} 
                      clickAway={this.toggleOpen} 
                      listStyle={this.props.className}
					  getListDom={this.getListDom.bind(this)}
					  content={this.list}
					  targetStyle={this.targetStyle}>       
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