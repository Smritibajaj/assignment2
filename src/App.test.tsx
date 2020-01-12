import React from 'react';
import { shallow } from 'enzyme';
import App from './AutoComplete';
const testState = { name: 'Hello' };
describe('App component', () => {
  it('start with empty string',()=>{
    const wrapper = shallow(<App />);
    const text = wrapper.find('input').text();
    console.log(text);
    expect(text).toEqual('');
  })
  it('increments input by 3 character', () => {
    const wrapper = shallow(<App />);
    const incrementBtn = wrapper.find('input');
    incrementBtn.at(0).simulate('change', { target: { name:'name',value: 'Hello' } });
    expect(testState.name).toEqual('Hello');
  });
});

