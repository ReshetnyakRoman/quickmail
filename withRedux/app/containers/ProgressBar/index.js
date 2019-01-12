import React from 'react';
import { connect } from 'react-redux';
import { makeSelectShowProgressBar } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Progress from './ProgressBar';
import Wrapper from './Wrapper';

const ProgressBar = props =>
  props.showProgressBar ? (
    <Wrapper>
      <Progress />
    </Wrapper>
  ) : null;

const mapStateToProps = createStructuredSelector({
  showProgressBar: makeSelectShowProgressBar(),
});

export default connect(
  mapStateToProps,
  null,
)(ProgressBar);

ProgressBar.propTypes = {
  showProgressBar: PropTypes.bool,
};
