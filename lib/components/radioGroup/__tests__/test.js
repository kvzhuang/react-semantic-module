/*jest.unmock('../index.js');

import React from 'react';
import RadioGroup from '../index.js';
import renderer from 'react-test-renderer';

describe('RadioGroup', () => {
  it('changes the class when hovered', () => {
    let group = [
			{label:'項目1',value: '111'},
			{label:'項目2',value: '222'},
			{label:'項目3',value: '333'},
			{label:'項目4',value: '444'},
			{label:'項目5',value: '555'},
		];
	const component = renderer.create(
      <RadioGroup group={group}
				name="radio_normal"/>
    );
    let tree = component.toJSON();
	console.log(tree);
    expect(tree).toMatchSnapshot();
  });
});*/
import React from 'react/addons';
import RadioGroup from '../index.js';

const chai = require("chai");
const expect = chai.expect;

let group = [
	{label:'項目1',value: '111'},
	{label:'項目2',value: '222'},
	{label:'項目3',value: '333'},
	{label:'項目4',value: '444'},
	{label:'項目5',value: '555'},
];

module.exports = describe("React Tesrt", () => {
	 it("should render something", () => {  
		let foo = React.addons.TestUtils.renderIntoDocument(<RadioGroup group={group}/>);
		expect(foo.getDOMNode()).to.exist; // 看有沒有 render 出 DOM
	});
})