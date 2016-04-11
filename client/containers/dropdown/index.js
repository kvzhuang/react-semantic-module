import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Button from 'client/components/button';
import DropdownMenu from 'client/components/dropdownMenu';
import DropdownList from 'client/components/dropList';
import Target from 'client/components/dropdownMenu/target';
import MenuItem from 'client/components/dropdownMenu/item';

let listContent = [
	'asd',
	'asdee' 
]
class DropdownPage extends Component {
	constructor(){
		super();
		this.state = {
			dropOpen: false,
			lightbox: false
		}
	}

	onSelected(value) {
		console.log(value);
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
					<Target>
						<Button label="show"
							focus={true}
							hover={true}
							ref="button"
						/>
					</Target>
					<MenuItem value="關於" index={1}><div>關於112645645645643445645648978974561231354564561231234684789423123456468421231456456</div></MenuItem>
					<MenuItem value="編輯" index={2}>編輯</MenuItem>
					<MenuItem value="其他" index={3}>其他</MenuItem>
					<MenuItem value="其他" index={4}>其他</MenuItem>
					<MenuItem value="其他" index={5}>其他</MenuItem>
					<MenuItem value="其他" index={6}>其他</MenuItem>
					<MenuItem value="其他" index={7}>其他</MenuItem>
					<MenuItem value="其他" index={8}>其他</MenuItem>
				</DropdownMenu>
				<h3>Drop List</h3>
				<div className="content">
					<p>Drop List為基本的類目選單，列表的內容為傳入的array動態產生</p>
				</div>
				<DropdownList 
					listContent={listContent}
					onSelected={this.onSelected.bind(this)}>
				</DropdownList>
				
			</div>
		);
	}
}

export default connect()(CSSModules(DropdownPage,style,{allowMultiple:true}));