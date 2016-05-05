import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Overlay from '../../utils/overlay';
import ReactDOM from 'react-dom';

let position = {};

class List extends Component{
	componentDidMount() {
		this.context.getListDom(this.refs.listContainer, this.refs.listArrow, this.refs.dropDownInnerList.offsetHeight +15);
	}
	clickList(){
		let that = this;
		setTimeout(function () {
			that.context.toggleOpen();
		},200);
	}
    render(){
		let arrowPosition = this.props.midPosition + 12;
		let show = this.context.open ? 'visible' : 'hidden';
		let dropStyle = this.context.open ? 
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
                        onRequestClose={this.context.toggleOpen}>
                </Overlay>
				<div styleName="container" ref="listContainer" style={dropStyle} onClick={this.clickList.bind(this)}>
					
					<div ref="dropDownInnerList" 
						styleName={listStyle}>
						<div styleName="arrow" ref="listArrow"></div>
						{ this.props.children } 
					</div>
				</div> 
            </div>
        );
    }
}
List.defaultProps = {
	width: 100
}
List.contextTypes = {
	open: React.PropTypes.bool,
	toggleOpen: React.PropTypes.func,
	getListDom: React.PropTypes.func
}
export default CSSModules(List,style,{allowMultiple:true});