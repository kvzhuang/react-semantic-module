import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';
import DropdownMenu from 'client/components/dropdownMenu';
import DropdwonItem from 'client/components/dropdownMenu/item';

import LightBox from 'client/components/lightbox';

class Demo extends Component {
    constructor(){
        super();
        this.state = {
            dropOpen: false,
            lightbox: false
        }
    }
    componentDidMount() {
        console.log(this.refs);   
    }
    toggleDrop(e){
        this.setState({
            lightbox: !this.state.lightbox
        })
    }
    lightboxClose(e) {
        this.setState({
            lightbox: false
        })
    }
    submit(e) {
        console.log("submit");
    }
	render() {
        let lightboxObtion = {
            submit: {
                text: '確定',
                action: this.submit
            },
            cancel: {
                text: 'Cancel',
            },
            closeIcon: true,
            title: '野豬騎士來囉'
        }
		return (
			<div>
				<Button label="follow"
						focus={true}
						onFocusLabel="following.."
						hover={true}
                        ref="button"
                        onClick={this.toggleDrop.bind(this)}
				/>
                <DropdownMenu open={this.state.dropOpen} 
                              toggle={this.toggleDrop.bind(this)}
                              styleName="listStyle">
                    <DropdwonItem>關於</DropdwonItem>
                    <DropdwonItem>關於</DropdwonItem>
                    <DropdwonItem>關於</DropdwonItem>
                </DropdownMenu>
                <LightBox open={this.state.lightbox}
                          option={lightboxObtion}
                          onClose={this.lightboxClose.bind(this)}> 
                    <h3>刪除背景照片</h3>
                    <p>移除照片後，會顯示系統預設的照片</p>
                </LightBox>
			</div>
		);
	}
}

export default connect()(CSSModules(Demo,style,{allowMultiple:true}));