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

class DropdownMenu extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
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
	
	componentDidMount() {
		console.log(ReactDOM.findDOMNode(this).offsetLeft);
		console.log(window.innerWidth);
		console.log(ReactDOM.findDOMNode(this).offsetWidth);
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
		this.setState({
			open: !this.state.open
		})
	}
	
	updateSelected(props) {
		this.props.onSelected(props);
	}
	
	getListDom(Node, Arrow) {
		let NodeProp = Node.getBoundingClientRect();
		let originLeft = targetStyle.left + (targetStyle.width / 2) - (NodeProp.width / 2);
		let NodeLeft = originLeft;

		if (originLeft < 0 ) {
			NodeLeft = 10;
		}else if (originLeft + NodeProp.width > window.innerWidth ) {
			NodeLeft =  window.innerWidth - NodeProp.width - 10;
		}
		
		Node.style.left = NodeLeft + 'px';
		Arrow.style.marginLeft = originLeft - NodeLeft - 12 + 'px';
		/*if( NodeProp.top + NodeProp.height > window.innerHeight ) {
			
			Node.style.marginTop = 0 - NodeProp.height + 'px';
		}*/
	}
	
    render(){
		
        return(
            <div> 
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