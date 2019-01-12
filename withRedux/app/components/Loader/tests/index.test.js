import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../index';

describe('<Loader />', () => {
  it('should match snapshot', () => {
    const rendredComponent = renderer.create(<Loader />).toJSON();
    expect(rendredComponent).toMatchSnapshot();
  });
});
