import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navigation extends Component {
	render() {
		return (
			<nav className="navigation">
				<Link className="navigation-link" to="/user/list">User list</Link>
				<Link className="navigation-link" to="/dropdown">DropDown</Link>
                <Link className="navigation-link" to="/lightbox">Lightbox</Link>
				<Link className="navigation-link" to="/form">Form</Link>
			</nav>
		);
	}
}

export default connect()(Navigation);