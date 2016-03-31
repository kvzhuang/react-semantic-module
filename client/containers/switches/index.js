import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';
import RadioGroup from 'client/components/radioGroup';

class Switches extends Component {
	constructor(){
		super();
	}
	radioSelect(value, index) {
		console.log(index);
		console.log(value);
	}
	render() {
		let group = [
			'項目1',
			'項目2',
			'項目3',
			'項目4',
			'項目5'
		];
		return (
			<div>
				<h2>Switches</h2>
				<div className="content">
				</div>
				<h3>RadioGroup</h3>
				<div className="content">
					<p>單選且可指定預設選項，custom = true的時候產生自訂欄位，選擇之後會自動focus在input區塊</p>
				</div>
				<RadioGroup
					group={group}
					name="radio"
					checkedIndex={2}
					onSelected={this.radioSelect.bind(this)}
					custom={true}
					styleName="radioGroup">
				</RadioGroup>
				<div className="content">
				<p>表單送出沒有選擇的時候</p>
				</div>
				<RadioGroup
					group={group}
					name="radio_none"
					onSelected={this.radioSelect.bind(this)}
					custom={true}
					styleName="radioGroup"
					errorMessage="請選擇項目">
				</RadioGroup>
				<RadioGroup
					group={group}
					name="checkbox"
					onSelected={this.radioSelect.bind(this)}
					custom={true}
					styleName="radioGroup"
					checkBox={true}
					checkLimit={3}>
				</RadioGroup>
			</div>
		);
	}
}

export default connect()(CSSModules(Switches,style,{allowMultiple:true}));