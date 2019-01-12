import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

const StyledDiv = props => {
  const { theme } = props;
  const UserNameText = styled.div`
    white-space: nowrap;
    overflow: auto;
    overflow: -moz-scrollbars-none;
    padding: 0.7rem;
    color: ${theme.sideBarColor};
    font-size: 0.65rem;
    z-index: 1;
    width: 95%;
    padding-bottom: 0;
    margin-bottom: 0;
    & ::-webkit-scrollbar {
      display: none;
    }
  `;
  return <UserNameText>{props.children}</UserNameText>;
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
