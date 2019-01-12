import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/App/messages';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideAddFolderModal } from 'containers/App/actions';
import { createFolderAtServer } from 'containers/Mailbox/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectAddFolderIsVisible } from 'containers/App/selectors';

const FormDialog = props => {
  const {
    handleClose,
    isVisible,
    handleAddFolder,
    addFolderDisagreeID,
    addFolderAgreeID,
    addFolderHeaderID,
    addFolderFormTextID,
    theme,
  } = props;

  const variantColors = {
    success: '#4dbd74',
    warning: '#ffc107',
    error: '#f86c6b',
    info: '#20a8d8',
  };

  let inputValue = '';

  const StyledButton = styled(Button)`
    color: ${variantColors.info} !important;
    :hover {
      background-color: ${theme.hoveredBackGround} !important;
  `;
  const StyledButtonAgree = styled(Button)`
    color: ${variantColors.success} !important;
    :hover {
      background-color: ${theme.hoveredBackGround} !important;
  `;
  const StyledTextField = styled(TextField)`
    & label[class*='MuiFormLabel-focused'] {
      color: ${variantColors.info} !important;
      opacity: 1;
    }
    & [class*='MuiInput-underline']::after {
      border-color: ${variantColors.info} !important;
      color: ${variantColors.info} !important;
    }
    & [class*='MuiFormLabel-root'] {
      color: ${theme.secondryTextColor} !important;
      opacity: 0.6;
    }
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

  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      handleAddFolder(inputValue);
    }
  }

  return (
    <div>
      <Dialog
        open={isVisible}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <StyledDialogTitle id="form-dialog-title">
          <FormattedMessage {...messages[addFolderHeaderID]} />
        </StyledDialogTitle>
        <StyledDialogContent>
          <StyledTextField
            margin="dense"
            id="name"
            label={<FormattedMessage {...messages[addFolderFormTextID]} />}
            type="Folder name"
            fullWidth
            onKeyUp={e => handleEnterKey(e)}
            onChange={e => (inputValue = e.target.value)}
          />
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton onClick={() => handleClose()} color="primary">
            <FormattedMessage {...messages[addFolderDisagreeID]} />
          </StyledButton>
          <StyledButtonAgree
            onClick={e => handleAddFolder(inputValue)}
            color="primary"
          >
            <FormattedMessage {...messages[addFolderAgreeID]} />
          </StyledButtonAgree>
        </StyledDialogActions>
      </Dialog>
    </div>
  );
};

FormDialog.propTypes = {
  addFolderHeaderID: PropTypes.string,
  addFolderFormTextID: PropTypes.string,
  addFolderDisagreeID: PropTypes.string,
  addFolderAgreeID: PropTypes.string,
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func,
  handleAddFolder: PropTypes.func,
  theme: PropTypes.object,
};

// export default withTheme(FormDialog);

const mapDispatchToProps = dispatch => ({
  handleAddFolder: folder => {
    dispatch(createFolderAtServer(folder));
    dispatch(hideAddFolderModal());
  },
  // showAddFolder: modalProps => dispatch(showAddFolderModal(modalProps)),
  handleClose: () => dispatch(hideAddFolderModal()),
});

const mapStateToProps = createStructuredSelector({
  isVisible: makeSelectAddFolderIsVisible(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(FormDialog));
