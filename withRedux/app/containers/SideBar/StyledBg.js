import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';

const StyledBg = props => {
  const { isOpen, theme, children } = props;
  const StyledAside = styled.aside`
    opacity: 1;
    filter: none;
    width: 150px;
    height: 100vh;
    position: fixed;
    left: 0;
    overflow: auto;
    z-index: 6;
    transition: all 0.3s ease-in-out;
    justify-content: flex-start !important;
    display: flex !important;
    flex-direction: column !important;
    border-right: 1px solid ${theme.sideBarBorderColor};
    background-color: ${theme.sideBarBgColor};
    color: ${theme.sideBarColor};
    @media (max-width: 768px) {
      width: ${isOpen ? '100%' : '0%'};
      opacity: ${isOpen ? 1 : 0};
      filter: ${isOpen ? 'alpha(opacity=0)' : 'none'};
    }
  `;
  return <StyledAside>{children}</StyledAside>;
};
StyledBg.propTypes = {
  isOpen: PropTypes.bool,
  theme: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default withTheme(StyledBg);
