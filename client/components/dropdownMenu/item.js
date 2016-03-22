import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Item extends Component{
    constructor(props) {
        super(props);
    }
	
    render(){
        return(
            <div onClick={this.context.getSelect.bind(null,this.props)} styleName="item" className={this.props.className}>
                { this.props.children }
            </div>
        );
    }
}
Item.propTypes = {
	index: React.PropTypes.number,
	value: React.PropTypes.string
}
Item.contextTypes = {
	getSelect: React.PropTypes.func
}
export default CSSModules(Item,style,{allowMultiple:true});