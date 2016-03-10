import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Overlay from 'util/overlay';

class Lightbox extends Component{
    constructor(props) {
        super(props);
        //console.log(this.props);
    }
    render(){
        let show = { 'display': 'flex' },
            hide = { 'display': 'none'}; 
        return(
            <div style={ this.props.open? show: hide}>
                <Overlay 
                         onRequestClose={this.props.onClose}
                         styleName="overlay">
                        
                </Overlay>
                <div styleName="lightbox">
                    { 
                        this.props.option.title && 
                        <div styleName="title">{ this.props.option.title }</div>
                    }
                    <div styleName="content">
                        { this.props.children }
                        { this.props.option.submit && <button onClick={this.props.option.submit.action} styleName="submit">{this.props.option.submit.text}</button>}
                        { this.props.option.cancel && <button onClick={this.props.onClose}>{this.props.option.cancel.text}</button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default CSSModules(Lightbox,style,{allowMultiple:true});