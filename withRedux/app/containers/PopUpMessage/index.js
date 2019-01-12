import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { variantColors } from 'containers/ThemeProvider/themes';
import { FormattedMessage } from 'react-intl';
import {
  makeSelectIsMsgVisible,
  makeSelectMessageType,
  makeSelectMessageID,
  makeSelectMsgParametr,
} from 'containers/App/selectors';
import messages from 'containers/App/messages';
import { hideInfoMessage } from 'containers/App/actions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function PopUpMessage(props) {
  const {
    hideInfoMessage,
    messageType,
    isMessageVisible,
    messageID,
    msgParametr,
  } = props;
  return (
    <Snackbar
      open={isMessageVisible}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MyPopupContent
        message={
          <FormattedMessage {...messages[messageID]} values={{ msgParametr }} />
        }
        variant={messageType}
        onClose={() => hideInfoMessage()}
      />
    </Snackbar>
  );
}

PopUpMessage.propTypes = {
  messageID: PropTypes.string,
  hideInfoMessage: PropTypes.func,
  messageType: PropTypes.string,
  isMessageVisible: PropTypes.bool,
  msgParametr: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  isMessageVisible: makeSelectIsMsgVisible(),
  messageType: makeSelectMessageType(),
  messageID: makeSelectMessageID(),
  msgParametr: makeSelectMsgParametr(),
});

const mapDispatchToProps = {
  hideInfoMessage,
};

function MyPopupContent(props) {
  const { message, onClose, variant, ...other } = props;
  const Icon = styled(variantIcon[variant])`
    margin-right: 10px;
  `;
  const SnackbarContentStyled = styled(SnackbarContent)`
    background-color: ${variantColors[variant]} !important;
    z-index: 300;
  `;

  return (
    <SnackbarContentStyled
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar">
          <Icon />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MyPopupContent.propTypes = {
  message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClose: PropTypes.func,
  variant: PropTypes.string,
  theme: PropTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopUpMessage);
