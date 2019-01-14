import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { animation } from 'config';
import { withTheme } from '@callstack/react-theme-provider';
import styled from 'styled-components';

function Wrapper(props) {
  const { theme } = props;
  const StyledDiv = styled.div`
    box-sizing: border-box;
    background-color: ${theme.backgroundColorLight};
    position: absolute;
    top: 80px;
    left: 160px;
    width: calc(100% - 185px);
    border: 1px solid ${theme.sideBarBorderColor};
    padding: 0.5rem 0.5rem;
    margin: 0.5rem;
    flex-direction: column;
    z-index: 4;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    @media (max-width: 768px) {
      top: 70px;
      left: 5px;
      width: calc(100% - 25px);
    }
  `;
  return <StyledDiv>{props.children}</StyledDiv>;
}

Wrapper.propTypes = {
  children: PropTypes.object,
};

export default withTheme(Wrapper);
