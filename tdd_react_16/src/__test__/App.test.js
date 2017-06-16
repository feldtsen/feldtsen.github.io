import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

test('Render shallow App', () => {
  shallow(<App/>);
});

/*
* Det ska finnas testfall som testar att formuläret innehåller
* input-element och att button-komponenten innehåller ett
* element med CSS-klassen "buttonClass".
*/

test('checks if input element exist', ()=>{
  let wrapper = shallow(<App/>).html();
  expect(wrapper.indexOf('<input type')).toBeGreaterThan(-1);
});

test('checks the CSS-class "buttonClass" exist', ()=>{
  let wrapper = shallow(<App/>).render();
  expect(wrapper.find('button').hasClass('buttonClass')).toBe(true);

});