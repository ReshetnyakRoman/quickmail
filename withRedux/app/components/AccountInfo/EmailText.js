import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

const StyledDiv = props => {
  const { theme } = props;
  const EmailText = styled.div`
    white-space: nowrap;
    overflow: auto;
    overflow: -moz-scrollbars-none;
    padding: 0.7rem;
    color: ${theme.sideBarColor};
    font-size: 0.65rem;
    z-index: 1;
    width: 95%;
    & ::-webkit-scrollbar {
      display: none;
    }
  `;
  return <EmailText>{props.children}</EmailText>;
};
export default withTheme(StyledDiv);

StyledDiv.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
};
