import React from 'react';
import styled from 'styled-components';
import { variantColors } from 'containers/ThemeProvider/themes';
import PropTypes from 'prop-types';

export default function MobileMenuIcon(props) {
  const StyledDiv = styled.div`
    position: fixed;
    top: 23px;
    left: 16px;
    z-index: 7;
    @media (min-width: 769px) {
      display: none;
    }
  `;
  const NavIcon = styled.div`
    width: 28px;
    height: 20px;
    position: relative;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    cursor: pointer;
    & span {
      display: block;
      position: absolute;
      height: 4px;
      width: 50%;
      opacity: 1;
      filter: none;
      background-color: ${variantColors.warning};
      transform: rotate(0deg);
      transition: 0.25s ease-in-out;
    }
    & span:nth-child(even) {
      left: 50%;
      border-radius: 0 4px 4px 0;
    }
    & span:nth-child(odd) {
      left: 0px;
      border-radius: 4px 0px 0px 4px;
    }
    & span:nth-child(1) {
      top: 0px;
    }
    & span:nth-child(3),
    span:nth-child(4) {
      top: 8px;
    }
    & span:nth-child(5),
    span:nth-child(6) {
      top: 16px;
    }
    & span:nth-child(1),
    span:nth-child(6) {
      transform: rotate(${props.isOpen ? '45deg' : '0deg'});
    }
    & span:nth-child(2),
    span:nth-child(5) {
      transform: rotate(${props.isOpen ? '-45deg' : '0deg'});
    }

    & span:nth-child(1) {
      top: ${props.isOpen ? '4px' : '0px'};
    }

    & span:nth-child(2) {
      left: ${props.isOpen ? 'calc(50% - 7px)' : '50%'};
      top: ${props.isOpen ? '4px' : '0px'};
    }

    & span:nth-child(3) {
      left: ${props.isOpen ? '-50px' : '0px'};
      opacity: ${props.isOpen ? 0 : 1};
    }

    & span:nth-child(4) {
      left: ${props.isOpen ? '100%' : '50%'};
      opacity: ${props.isOpen ? 0 : 1};
    }

    & span:nth-child(5) {
      top: ${props.isOpen ? '12px' : '16px'};
    }

    & span:nth-child(6) {
      left: ${props.isOpen ? 'calc(50% - 7px)' : '50%'};
      top: ${props.isOpen ? '12px' : '16px'};
    }
  `;

  return (
    <StyledDiv
      onClick={() => {
        props.onIconClick();
      }}
    >
      <NavIcon>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </NavIcon>
    </StyledDiv>
  );
}

MobileMenuIcon.propTypes = {
  isOpen: PropTypes.bool,
  onIconClick: PropTypes.func,
};
