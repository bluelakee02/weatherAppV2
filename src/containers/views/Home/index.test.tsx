import * as React from 'react';
import { shallow, render, mount } from 'enzyme';
import Home from './index';

describe('Home test', () => {
  it('Matches the snapshot', () => {
    expect(shallow(<Home />)).toMatchSnapshot();
  });

  it('Has proper class', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find(`.container`)).toHaveLength(1);
  });

  it('Has proper nodes', async () => {
    let wrapper = mount(<Home />);

    expect(wrapper.find('h1').length).toBe(0);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);

  });

  it('Renders static HTML', () => {
    expect(render(<Home />).text()).toContain('Search');
  });
});
