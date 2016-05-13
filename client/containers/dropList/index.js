import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import DropList from 'client/components/dropList';

let listContent = [
	{ label: '公開', value: '111', iconFont: 'fa-globe'},
	{ label: '朋友', value: '222', iconFont: 'fa-user'},
	{ label: '只限本人', value: '333', iconFont: 'fa-lock'}
]
let listContent2 = [
	{ label: '大學', value: '111'},
	{ label: '高中以下', value: '222'},
	{ label: '高中職', value: '333'},
	{ label: '專科', value: '333'},
	{ label: '碩士', value: '333'},
	{ label: '博士', value: '333'},
]
class DropListPage extends Component {
	constructor(){
		super();
	}

	onSelected(value) {
		console.log(value);
	}
	render() {
		return (
			<div>
				<h3>Drop List</h3>
				<div className="content">
					<p>Drop List為基本的類目選單，列表的內容為傳入的array動態產生</p>
				</div>
				<table>
					<tbody>
						<tr>
							<td>有iconfont＆預設值</td><td>無預設值的狀態</td><td>Disabled狀態</td>
						</tr>
						<tr>
							<td>
								<DropList 
									listContent={listContent}
									onSelected={this.onSelected.bind(this)}
									defaultIndex={1}/>
							</td>
							<td>
								<DropList 
									listContent={listContent2}
									onSelected={this.onSelected.bind(this)}/>
							</td>
							<td>
								<DropList 
									listContent={listContent2}
									onSelected={this.onSelected.bind(this)}
									disabled={true}/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default connect()(CSSModules(DropListPage,style,{allowMultiple:true}));