import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Overlay extends Component{
    constructor(props) {
        super(props);
        console.log(props);
    }
    handleClick(e) {
        if(this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }
    render(){
        return(
            <div style={this.props.style}
                 className={this.props.className}
                 styleName="overlay"
                 onClick={this.handleClick.bind(this)}>
                 { this.props.children }
            </div>
        );
    }
}

export default CSSModules(Overlay,style,{allowMultiple:true});