import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';

class ImageBlock extends Component{
    render(){
		const { src
		} = this.props;

        return(
            <div>
				<div styleName="close"></div>
                <img src={src} />
            </div>
        );
    }
}

export default ImageBlock;