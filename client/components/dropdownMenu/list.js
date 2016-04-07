import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import Transitions from 'util/transitions';
import Overlay from 'util/overlay';
import ReactDOM from 'react-dom';

let position = {};

class List extends Component{
	componentDidMount() {
		this.props.getListDom(this.refs.listContainer, this.refs.listArrow);
		console.log(this.props.children); 
		console.log(this.props.targetStyle);
	}
	
    render(){
		let tt =   this.props.targetStyle;
		/*let arrowStyle = {
			left: tt.left + (tt.width / 2) - 12 + 'px',
			top: tt.top + tt.height + 5 + 'px'
		}
		let listStyle = {
			left: tt.left + (tt.width / 2) - (this.props.width / 2) + 'px',
			top: tt.top + tt.height + 5 + 24 + 'px'
		}*/
		let arrowPosition = this.props.midPosition + 12;
		let show = this.props.open ? 'visible' : 'hidden';
		let listStyle = this.props.open ? 
						{
							visibility: 'visible',
							transform: 'scaleY(1)'
						} : 
						{
							visibility: 'hidden',
							transform: 'scaleY(0)'
						}
        return(
            <div style={{ visibility: show}}>
                <Overlay 
                        onRequestClose={this.props.clickAway}>
                </Overlay>
				<div styleName="container" ref="listContainer" style={listStyle}>
					
					<div ref="dropDownInnerList" 
						styleName="list"
						className={this.props.listStyle}>
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