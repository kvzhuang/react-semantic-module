import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class Item extends Component{
    constructor(props) {
        super(props);
    }
	handleClick(){
        this.context.getSelect.bind(null,this.props)
        this.props.onClick();
    }
    render(){
		const children = React.Children.map(this.props.children, (child) => {
			if( React.isValidElement(child) ) return React.cloneElement(child); 
			else return (<div>{child}</div>);
			
		})
        return(
            <div onClick={this.handleClick.bind(this)} styleName="item" className={this.props.className}>
                {children}
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