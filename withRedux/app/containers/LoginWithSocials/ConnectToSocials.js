/*
 * This is HOC whitch asynchroniusly loading VK and FB SDK
 * and connect it to window object, 
 * you can call it with window.VK.someAPI or window.FB.someAPI
 * when API is loaded, withLoginToSocials component start its action
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadSocialSDK, isUserLoggedToSocial } from './actions';

function connectToSocials(WrappedComponent) {
  const Wrapper = () => {
    return class extends React.Component {
      componentDidMount() {
        this.props.loadSDK('FB');
        this.props.loadSDK('VK');
        this.props.isUserLoggedToSocial();
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
  return connect(
    null,
    mapDispatchToProps,
  )(Wrapper());
}

connectToSocials.propTypes = {
  loadSDK: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  loadSDK: social => dispatch(loadSocialSDK(social)),
  isUserLoggedToSocial: () => dispatch(isUserLoggedToSocial()),
});

export default connectToSocials;
