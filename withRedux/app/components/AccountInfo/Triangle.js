import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

const StyledDiv = props => {
  const { theme } = props;
  const MyDiv = styled.div`
    position: absolute;
    height: 20px;
    width: 20px;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: ${theme.sideBarBgColor};
    left: 50%;
  `;
  return <MyDiv />;
};

export default withTheme(StyledDiv);

StyledDiv.propTypes = {
  theme: PropTypes.object,
};
