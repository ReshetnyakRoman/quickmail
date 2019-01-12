import React from 'react';
import rendered from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Login from '../index';

describe('<Login />', () => {
  it('shuld match with snapshot', () => {
    const rendredComponent = rendered
      .create(
        <IntlProvider locale="en">
          <Router>
            <Login />
          </Router>
        </IntlProvider>,
      )
      .toJSON();
    expect(rendredComponent).toMatchSnapshot();
  });
});
