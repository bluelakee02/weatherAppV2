import * as React from 'react';
import {shallow, render, mount} from 'enzyme';

import Footer from './index';

describe('Footer test', () => {
  it('Matches the snapshot', () => {
    expect(shallow(<Footer/>)).toMatchSnapshot();
  });

  it('Has proper class', () => {
    const wrapper = mount(<Footer/>);
    expect(wrapper.find(`.footer`)).toHaveLength(1);
  });

  it('Has proper nodes', () => {
    expect(mount(<Footer/>).find('h1').length).toBe(0);
    expect(mount(<Footer/>).find('h2').length).toBe(1);
  });

  it('Renders static HTML', () => {
    expect(render(<Footer/>).text()).toEqual('blueLake 2020thx to MetaWeather');
  });
});
