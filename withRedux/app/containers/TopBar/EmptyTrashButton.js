import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { variantColors } from 'containers/ThemeProvider/themes';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import StyledTooltip from 'components/StyledTooltip';

const StyledButton = styled(Button)`
  color: white !important;
  background-color: ${variantColors.error} !important;

  margin: 16px 10px 16px 0px !important;
  padding: 4px 8px !important;
  & :hover {
    background-color: ${variantColors.errorD1} !important;
  }
`;

const EmptyTrashButton = props => (
  <StyledTooltip theme={props.theme} title={props.tooltip}>
    <StyledButton onClick={() => props.onEmptyTrash()}>
      <DeleteIcon />
    </StyledButton>
  </StyledTooltip>
);

EmptyTrashButton.propTypes = {
  tooltip: PropTypes.object,
  theme: PropTypes.object,
  onEmptyTrash: PropTypes.func,
};

export default withTheme(EmptyTrashButton);
