/*
 * This component managing routes
*/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Mailbox from 'containers/Mailbox/Loadable';
import LoginPage from 'components/LoginPage/Loadable';

const Routes = props => (
  <div>
    <Route
      strict
      path="/attachments/"
      component={() => {
        window.location = props.url;
        return null;
      }}
    />
    <Route
      path="/welcome"
      render={() => (props.isLoggedIn ? <Redirect to="/" /> : <LoginPage />)}
    />

    <Route
      render={routerProps => {
        if (!props.isLoggedIn) {
          routerProps.history.push('/welcome');
          return <LoginPage />;
        }
        routerProps.history.push('/');
        return <Mailbox />;
      }}
    />
    {/*props.isLoggedIn ? <Mailbox /> : <LoginPage />*/}
  </div>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  url: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(['Login', 'isLoggedIn']),
  url: state.getIn(['router', 'location', 'pathname']),
});

export default connect(mapStateToProps)(Routes);
