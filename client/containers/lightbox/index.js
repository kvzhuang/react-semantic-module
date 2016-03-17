import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';

import LightBox from 'client/components/lightbox';

class LightboxPage extends Component {
	constructor(){
		super();
		this.state = {
			lightbox: false,
            choose: 0
		}
	}
	componentDidMount() {
		console.log(this.refs);   
	}
	toggleLightbox(index){
		this.setState({
			lightbox: !this.state.lightbox,
            choose: index
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
	action(e) {
		console.log("this is a action!");
	}
	render() {
		let lightboxObtion1 = {
			submit: {
				text: '確定',
				action: this.submit
			},
			cancel: {
				text: '取消',
			},
		},
            lightboxObtion2 = {
            submit: {
                text: '確定',
                action: this.submit
            },
            cancel: {
                text: 'Cancel',
            },
            closeIcon: true,
            title: '野豬騎士來囉'
        },
        lightboxObtion3 = {
            closeIcon: true,
            title: '野豬騎士來囉',
            contentHeight: '400px'
        }, option;
        switch(this.state.choose){
            case 1:
                option = lightboxObtion1;
            break;
            case 2:
                option = lightboxObtion2;
            break;
            case 3:
                option = lightboxObtion3;
            break;
        }
		return (
			<div>
				<Button label="with Title"
						focus={true}
						hover={true}
						ref="button"
						onClick={this.toggleLightbox.bind(this,1)}
				/>
                <Button label="with Title"
						focus={true}
						hover={true}
						ref="button"
						onClick={this.toggleLightbox.bind(this,2)}
				/>
                 <Button label="with Title"
						focus={true}
						hover={true}
						ref="button"
						onClick={this.toggleLightbox.bind(this,3)}
				/>
                { this.state.lightbox && 
				<LightBox open={this.state.lightbox}
						  option={option}
						  onClose={this.lightboxClose.bind(this)}> 
					<h3>刪除背景照片</h3>
					<p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
                    <p>移除照片後，會顯示系統預設的照片</p>
				</LightBox>
                }
			</div>
		);
	}
}

export default connect()(CSSModules(LightboxPage,style,{allowMultiple:true}));