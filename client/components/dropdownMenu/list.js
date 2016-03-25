import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import Overlay from 'util/overlay';
import ReactDOM from 'react-dom';

let position = {};

class List extends Component{
	componentDidMount() {
		this.props.getListDom(this.refs.dropDownInnerList);
		console.log(this.props.children); 
	}
	
    render(){
        let show = { 'display': 'block' },
            hide = { 'display': 'none'}; 
        return(
            <div>
                <Overlay 
                        onRequestClose={this.props.clickAway}>
                </Overlay>
				
                <div ref="dropDownInnerList"
                     styleName={"list " + this.props.type} 
                     className={this.props.listStyle}>
					<div styleName="arrow" style={this.props.arrowStyle}></div>
                    { this.props.content } 
                </div>
            </div>
        );
    }
}

export default CSSModules(List,style,{allowMultiple:true});