import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const BoxMessage = props => {
  const { theme } = props;
  const StyledCard = styled(Card)`
    background-color: ${theme.warningColor} !important;
    margin: 10px;
    color: white !important;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
  `;
  const StyledButton = styled(IconButton)`
    color: inherit !important;
  `;
  return (
    <StyledCard>
      {props.children}
      <StyledButton onClick={() => props.handleCloseClick()}>
        <CloseIcon />
      </StyledButton>
    </StyledCard>
  );
};

BoxMessage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleCloseClick: PropTypes.func,
  theme: PropTypes.object,
};

export default withTheme(BoxMessage);
