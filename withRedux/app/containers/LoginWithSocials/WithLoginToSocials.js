/*
 * This is HOC checks whether user logged to VK or FB.
 * It will start login to application if check success 
 * or just provide login functionality to wrapped component
*/

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import { loginToSocial } from './actions';
import reducer from './reducer';

function withLoginToSocials(WrappedComponent) {
  const Wrapper = () => {
    return props => (
      <WrappedComponent {...props} login={social => props.loginTo(social)} />
    );
  };

  return connect(
    null,
    mapDispatchToProps,
  )(Wrapper());
}

withLoginToSocials.propTypes = {
  loginTo: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  loginTo: social => dispatch(loginToSocial(social)),
});

const withReducer = injectReducer({
  key: 'Login',
  reducer,
});

export default compose(
  withReducer,
  withLoginToSocials,
);
