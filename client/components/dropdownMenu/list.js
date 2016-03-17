import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import Overlay from 'util/overlay';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let position = {};

class List extends Component{
    constructor(props) {
        super(props);
        console.log(props);
    }
    componentDidMount() {
        position = {
            top: ReactDOM.findDOMNode(this.props.root).offsetTop,
            left: ReactDOM.findDOMNode(this.props.root).offsetLeft
        }
    }
    render(){
        let show = { 'display': 'block' },
            hide = { 'display': 'none'}; 
        return(
            <div style={ this.props.open? show: hide}>
                <Overlay 
                        onRequestClose={this.props.clickAway}>
                </Overlay>
                <div style={position}
                        styleName="list" 
                        className={this.props.listStyle}>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default CSSModules(List,style,{allowMultiple:true});