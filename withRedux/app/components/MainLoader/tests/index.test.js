import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import MainLoader from '../index';

describe('<MainLoader />', () => {
  it('should match the snapshot', () => {
    const rendredComponent = renderer.create(<MainLoader />).toJSON();
    expect(rendredComponent).toMatchSnapshot();
  });
});
