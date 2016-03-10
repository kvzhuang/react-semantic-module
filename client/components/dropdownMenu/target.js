import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Target extends Component{
    constructor(props) {
        super(props);
        //console.log(this.props);
    }
    handleClick(e) {
        this.props.toggle();
    }
    render(){
        return(
            <div className={this.props.className} onClick={this.handleClick.bind(this)}>
                { this.props.children }
            </div>
        );
    }
}

export default CSSModules(Target,style,{allowMultiple:true});