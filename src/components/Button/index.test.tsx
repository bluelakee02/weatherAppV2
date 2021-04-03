import * as React from 'react';
import {shallow, mount, render} from 'enzyme';

import Button from './index';

describe('Button test', () => {
  it('should match the snapshot', () => {
    expect(shallow(<Button/>)).toMatchSnapshot();
  });

  it('should be selectable by class', () => {
    expect(shallow(<Button/>).is('.mainButton')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Button/>).find('.mainButton').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(<Button label="Hello" />).text()).toEqual('Hello');
  });
});
