import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import Overlay from 'util/overlay';
import ReactDOM from 'react-dom';

let position = {};

class List extends Component{

    render(){
        let show = { 'display': 'block' },
            hide = { 'display': 'none'}; 
        return(
            <div style={ this.props.open? show: hide}>
                <Overlay 
                        onRequestClose={this.props.clickAway}>
                </Overlay>
				
                <div 
                     styleName="list" 
                     className={this.props.listStyle}>
					<div styleName="arrow" style={this.props.arrowStyle}></div>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default CSSModules(List,style,{allowMultiple:true});