import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { withTheme } from '@callstack/react-theme-provider';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
function SideBar(props) {
  return <div />;
}

App.propTypes = {
  sss: PropTypes.string,

  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'SideBar', reducer });
const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withTheme(SideBar));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(TopBar));