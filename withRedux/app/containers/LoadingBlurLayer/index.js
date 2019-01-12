import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import { makeSelectIsLoading } from 'containers/App/selectors';

const BlurLayer = props => {
  const Blur = styled.div`
    ${props.isLoading ? 'filter: blur(3px);' : ''};
  `;
  return (
    <React.Fragment>
      {props.isLoading ? <Loader /> : null}
      <Blur>{props.children}</Blur>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoading(),
});

export default connect(
  mapStateToProps,
  null,
)(BlurLayer);

BlurLayer.propTypes = {
  children: PropTypes.element.isRequired,
  isLoading: PropTypes.bool,
};
