import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';



class Target extends Component{
	
    render(){
		const children = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child); 
		})
        return(
            <div onClick={this.context.toggleOpen}>  
				{children} 
            </div>
        );
    }
}
Target.contextTypes = {
	toggleOpen: React.PropTypes.func
}
export default CSSModules(Target,style,{allowMultiple:true});