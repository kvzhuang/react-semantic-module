import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Item extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default CSSModules(Item,style,{allowMultiple:true});