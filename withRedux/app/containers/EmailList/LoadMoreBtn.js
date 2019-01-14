import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { variantColors } from 'containers/ThemeProvider/themes';

const StyledButton = styled(Button)`
  color: ${variantColors.info} !important;
  margin: 16px 10px 16px 0px !important;
  padding: 8px 20px !important;

  border-color: ${variantColors.info} !important;
  :hover {
    background-color: ${variantColors.info} !important;
    color: white !important;
  }
`;

const LoadMore = props => (
  <StyledButton
    variant="outlined"
    onClick={() => props.onClick()}
    onTouchEnd={() => props.onClick()}
  >
    {props.children}
  </StyledButton>
);

LoadMore.propTypes = {
  handleLoadMoreClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default LoadMore;
