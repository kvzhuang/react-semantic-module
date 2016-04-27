import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import { Button } from 'c_wap_module';
import DropList from 'client/components/droplist';
import DropdownMenu from 'client/components/dropdownMenu';
import DropdownTarget from 'client/components/dropdownMenu/target';
import DropdownItem from 'client/components/dropdownMenu/item';

let listContent = [
	{ label: '項目1', value: '111'},
	{ label: '項目2', value: '222'}
]
class DropdownPage extends Component {
	constructor(){
		super();
		this.state = {
			dropOpen: false,
			lightbox: false,
			test: '123'
		}
	}

	onSelected(value) {
		console.log(value);
	}
	test (){
		console.log("test");
		this.setState({
			test: '234'
		})
	} 
	render() {
		return (
			<div>
				<h2>DropDown</h2>
				<div className="content">
					<p>Dropdown系列一致在onSelect的時候讓使用者取得選擇的值，再由使用者自己決定要作什麼樣的處理</p>
				</div>
				<h3>DropDown Menu</h3>
				<div className="content">
					<p>DropdownMenu定義為點擊圖示後的下拉式選單</p>
					<p>帶有transition特效</p>
				</div>
				<DropdownMenu
					onSelected={this.onSelected.bind(this)}
					styleName="listStyle">
					<DropdownTarget>
						<Button label="show"
							focus={true}
							hover={true}
							ref="button"
							
						/>
						<p>{ this.state.test }</p>
					</DropdownTarget>
					<DropdownItem value="關於" index={1} onClick={this.test.bind(this)}><div>關於112645645645643445645648978974561231354564561231234684789423123456468421231456456</div></DropdownItem>
					<DropdownItem value="編輯" index={2}>編輯</DropdownItem>
					<DropdownItem value="其他" index={3}>其他</DropdownItem>
					<DropdownItem value="其他" index={4}>其他</DropdownItem>
					<DropdownItem value="其他" index={5}>其他</DropdownItem>
					<DropdownItem value="其他" index={6}>其他</DropdownItem>
					<DropdownItem value="其他" index={7}>其他</DropdownItem>
					<DropdownItem value="其他" index={8}>其他</DropdownItem>
				</DropdownMenu>
				<DropdownMenu
					onSelected={this.onSelected.bind(this)}
					styleName="listStyle">
					<DropdownTarget>
						<Button label="show"
							focus={true}
							hover={true}
							ref="button"
						/>
					</DropdownTarget>
					<DropdownItem value="關於" index={1}><div>關於112645645645643445645648978974561231354564561231234684789423123456468421231456456</div></DropdownItem>
					<DropdownItem value="編輯" index={2}>編輯</DropdownItem>
					<DropdownItem value="其他" index={3}>其他</DropdownItem>
					<DropdownItem value="其他" index={4}>其他</DropdownItem>
					<DropdownItem value="其他" index={5}>其他</DropdownItem>
					<DropdownItem value="其他" index={6}>其他</DropdownItem>
					<DropdownItem value="其他" index={7}>其他</DropdownItem>
					<DropdownItem value="其他" index={8}>其他</DropdownItem>
				</DropdownMenu>
				<h3>Drop List</h3>
				<div className="content">
					<p>Drop List為基本的類目選單，列表的內容為傳入的array動態產生</p>
				</div>
				<DropList 
					listContent={listContent}
					onSelected={this.onSelected.bind(this)}>
				</DropList>
				
			</div>
		);
	}
}

export default connect()(CSSModules(DropdownPage,style,{allowMultiple:true}));