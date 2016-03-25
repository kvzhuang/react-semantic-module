import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import List from 'client/components/dropdownMenu/list';
import ReactDOM from 'react-dom';

let target;
let list = [];

class DropdownMenu extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
		this.state = {
			open: false,
			posType: 'default'
		}
		this.toggleOpen = this.toggleOpen.bind(this);
		this.updateSelected = this.updateSelected.bind(this);
    }

	componentWillMount() {
		let that = this;
		
		React.Children.map(this.props.children, function(child,index){
			if( child.type.displayName === 'Target' ) {
				target = React.cloneElement(child);
			}else {
				list.push(child);
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
			getSelect: this.updateSelected
		};
	}
	
	toggleOpen() {
		this.setState({
			open: !this.state.open
		})
	}
	
	updateSelected(props) {
		this.props.onSelected(props);
	}
	
	getListDom(Node) {
		let NodeProp = Node.getBoundingClientRect();
		if( NodeProp.left + NodeProp.width > window.innerWidth ) {
			this.setState({
				posType: 'right'
			})
		}else if ( NodeProp.left < 0 ) {
			this.setState({
				posType: 'left'
			})
		}
	}
	
    render(){
        return(
            <div> 
				{target}
				{this.state.open && 
				<List type={this.state.posType}
				      open={this.state.open} 
                      clickAway={this.toggleOpen} 
                      listStyle={this.props.className}
                      arrowStyle={this.props.arrowStyle}
					  getListDom={this.getListDom}
					  content={list}>
                    
                </List>} 
                
            </div>
        );
    }
}

DropdownMenu.childContextTypes = {
	toggleOpen: React.PropTypes.func,
	getSelect: React.PropTypes.func
}

export default CSSModules(DropdownMenu,style,{allowMultiple:true});