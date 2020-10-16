import * as React from 'react';
import {shallow, render, mount} from 'enzyme';

import Header from './index';

describe('Header test', () => {
    it('Matches the snapshot', () => {
        expect(shallow(<Header/>)).toMatchSnapshot();
    });

    it('Has proper class', () => {
        const wrapper = mount(<Header/>);
        expect(wrapper.find(`.header`)).toHaveLength(1);
    });

    it('Has proper nodes', () => {
        expect(mount(<Header/>).find('h1').length).toBe(1);
    });

    it('Renders static HTML', () => {
        expect(render(<Header/>).text()).toEqual('Weather App');
    });
});
