import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/App/messages';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import { connect } from 'react-redux';
import { hideConfirmationModal } from 'containers/App/actions';
import { removeFolderFromServer } from 'containers/Mailbox/actions';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectConfAlertIsVisible,
  makeSelectConfAlertHeaderID,
  makeSelectConfAlertBodyID,
  makeSelectConfAlertAgree,
  makeSelectConfAlertDisagree,
  makeSelectConfAlertFolder,
} from 'containers/App/selectors';

const ConfirmationAlert = props => {
  const {
    headerID,
    bodyID,
    disagreeButtonTextID,
    agreeButtonTextID,
    isVisible,
    handleClose,
    handleAgree,
    folder,
    theme,
  } = props;

  const StyledButton = styled(Button)`
    color: ${theme.infoColor} !important;
    :hover {
      background-color: ${theme.hoveredBackGround} !important;
    }
  `;
  const StyledButtonAgree = styled(Button)`
    color: ${theme.errorColor} !important;
    :hover {
      background-color: ${theme.hoveredBackGround} !important;
  `;
  const StyledDialogTitle = styled(DialogTitle)`
    background-color: ${theme.backgroundColorLight} !important;
    & h2 {
      color: ${theme.primaryTextColor} !important;
    }
  `;
  const StyledDialogContent = styled(DialogContent)`
    background-color: ${theme.backgroundColorLight} !important;
    & p {
      color: ${theme.secondryTextColor} !important;
    }
  `;
  const StyledDialogActions = styled(DialogActions)`
    background-color: ${theme.backgroundColorLight} !important;
    margin: 0px !important;
    padding: 8px 4px;
  `;
  const msgParametr = decodeURI(folder);
  return (
    <Dialog
      open={isVisible}
      onClose={() => handleClose()}
      aria-labelledby="Delete Folder confirmation"
      aria-describedby="are you sure you want to delete folder"
    >
      <StyledDialogTitle id="alert-dialog-title">
        <FormattedMessage {...messages[headerID]} values={{ msgParametr }} />
      </StyledDialogTitle>
      <StyledDialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage {...messages[bodyID]} values={{ msgParametr }} />
        </DialogContentText>
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={() => handleClose()} color="primary">
          <FormattedMessage {...messages[disagreeButtonTextID]} />
        </StyledButton>
        <StyledButtonAgree
          onClick={() => handleAgree(folder)}
          color="primary"
          autoFocus
        >
          <FormattedMessage {...messages[agreeButtonTextID]} />
        </StyledButtonAgree>
      </StyledDialogActions>
    </Dialog>
  );
};

ConfirmationAlert.propTypes = {
  headerID: PropTypes.string,
  bodyID: PropTypes.string,
  disagreeButtonTextID: PropTypes.string,
  agreeButtonTextID: PropTypes.string,
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAgree: PropTypes.func,
  theme: PropTypes.object,
  folder: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  handleAgree: folder => dispatch(removeFolderFromServer(folder)),
  handleClose: () => dispatch(hideConfirmationModal()),
});

const mapStateToProps = createStructuredSelector({
  isVisible: makeSelectConfAlertIsVisible(),
  headerID: makeSelectConfAlertHeaderID(),
  bodyID: makeSelectConfAlertBodyID(),
  folder: makeSelectConfAlertFolder(),
  disagreeButtonTextID: makeSelectConfAlertDisagree(),
  agreeButtonTextID: makeSelectConfAlertAgree(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ConfirmationAlert));
