import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Overlay from '../../utils/overlay';
import ReactDOM from 'react-dom';

let position = {};

class List extends Component{
	componentDidMount() {
		this.props.getListDom(this.refs.listContainer, this.refs.listArrow, this.refs.dropDownInnerList.offsetHeight +15);
	}
	
    render(){
		let tt =   this.props.targetStyle;
		let arrowPosition = this.props.midPosition + 12;
		let show = this.props.open ? 'visible' : 'hidden';
		let dropStyle = this.props.open ? 
						{
							visibility: 'visible',
							height: this.refs.dropDownInnerList.offsetHeight +30,
						} : 
						{
							visibility: 'hidden',
							height: 0
						}
		let listStyle = this.props.top ? 'list top' : 'list';
        return(
            <div style={{ visibility: show, position: 'relative'}}>
                <Overlay 
                        onRequestClose={this.props.clickAway}>
                </Overlay>
				<div styleName="container" ref="listContainer" style={dropStyle}>
					
					<div ref="dropDownInnerList" 
						styleName={listStyle}>
						<div styleName="arrow" ref="listArrow"></div>
						{ this.props.content } 
					</div>
				</div> 
            </div>
        );
    }
}
List.defaultProps = {
	width: 100
}
export default CSSModules(List,style,{allowMultiple:true});