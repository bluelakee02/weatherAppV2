import * as React from 'react';
import {shallow, mount, render} from 'enzyme';

import { Loading } from './index';

describe('Messages test', () => {
  it('should match the snapshot', () => {
    expect(shallow(<Loading/>)).toMatchSnapshot();
  });


  it('should mount in a full DOM', () => {
    expect(mount(<Loading/>).find('div').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(<Loading/>).text()).toEqual('Loading...');
  });
});
