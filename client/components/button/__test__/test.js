import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../index.js';
import TestUtils from 'react-addons-test-utils';

const chai = require("chai");
const expect = chai.expect;

module.exports = describe("React Tesrt", () => {
	 it("should render something", () => {  
		let button = TestUtils.renderIntoDocument(<Button />);
		expect(ReactDOM.findDOMNode(button)).to.exist; // 看有沒有 render 出 DOM
	});
})