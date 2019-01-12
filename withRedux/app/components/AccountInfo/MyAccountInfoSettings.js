import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

const StyledDiv = props => {
  const { theme } = props;
  const shadow =
    theme.type === 'ligthTheme'
      ? '0 0 35px rgba(0, 0, 0, 0.3)'
      : '0 0 60px rgba(0, 0, 0, 1);';
  const MyDiv = styled.div`
    border-radius: 10px;
    box-shadow: ${shadow};
    background-color: ${theme.sideBarBgColor};
  `;
  return <MyDiv>{props.children}</MyDiv>;
};

export default withTheme(StyledDiv);

StyledDiv.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  theme: PropTypes.object,
};
