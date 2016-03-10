import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import List from 'client/components/dropdownMenu/list';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class DropdownMenu extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    componentDidMount() {
        console.log(ReactDOM.findDOMNode(this).offsetTop);   
    }
    render(){
        return(
            <div>  
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={300}>      
                <List open={this.props.open} 
                      clickAway={this.props.toggle} 
                      listStyle={this.props.className}
                      root={this}>
                    { this.props.children }
                </List>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default CSSModules(DropdownMenu,style,{allowMultiple:true});