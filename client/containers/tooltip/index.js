import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import style from './style.css';

import Tooltip from 'client/components/tooltip';

class Demo extends Component {
	constructor(){
		super();
	}
	render() {

		return (
			<div>
                <Tooltip icon="" hint="帳號設定完成後...."/>
			</div>
		);
	}
}

export default connect()(CSSModules(Demo,style,{allowMultiple:true}));