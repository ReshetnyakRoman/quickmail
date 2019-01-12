import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';

const Wrapper = props => {
  const { theme } = props;
  const StyledDiv = styled.div`
    position: relative;
    font-size: 0.9rem;

    ul {
      margin: 0;
      list-style-type: none;
      padding: 0;
      color: #fff;
    }
    li {
      position: relative;
      padding: 1rem 0.5rem 0rem 1rem;
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    .onDrugHover {
      height: 24px;
      width: 80%;
      z-index: -1;
      position: absolute;
      background-color: ${theme.warningColor};
      border-radius: 4px;
      top: 7px;
    }
    .onDrugHoverSub {
      height: 90%;
      width: 80%;
      z-index: -1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${theme.warningColor};
      border-radius: 4px;
    }
    li:nth-of-type(1) {
      transition-delay: 40ms;
    }
    li:nth-of-type(2) {
      transition-delay: 80ms;
    }
    li:nth-of-type(3) {
      transition-delay: 120ms;
    }
    li:nth-of-type(4) {
      transition-delay: 160ms;
    }
    li a {
      padding-left: 4px;
      color: ${theme.sideBarColor};
      text-decoration: none;
      opacity: 0.8;
      display: inline-block;
      transform: translateY(-0.5rem);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    li svg.toogle {
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }

    li.isActive a {
      opacity: 1;
      transform: translate(4px, -0.5rem);
    }
    li.isActive svg.toogle {
      opacity: 1;
      transform: translate(4px, 0rem);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    li.isActive svg {
      opacity: 1;
      transform: translate(4px, 0rem);
    }
    li.isActive::before {
      transform: translateX(0px);
      transition: all 150ms ease;
    }
    li.isActive::hover a {
      transform: translate(4px, -0.5rem);
      opacity: 1;
    }
    li:hover a {
      opacity: 1;
      transform: translate(11px, -0.5rem);
    }
    li:hover svg.toogle {
      transform: translate(11px, -0rem);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    li.isActive:hover a {
      opacity: 1;
      transform: translate(4px, -0.5rem);
    }
    li.isActive:hover svg {
      transform: translate(4px, -0rem);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }

    li:hover::before {
      transform: translateX(0px);
      transition: all 150ms ease;
    }
    .trashItem:before {
      content: '';
      width: 9px;
      height: 100%;
      background-color: ${theme.warningColor};
      left: 0;
      top: 0;
      position: absolute;
      transform: translateX(-3px);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    .draftItem:before {
      content: '';
      width: 9px;
      height: 100%;
      background-color: ${theme.infoColor};
      left: 0;
      top: 0;
      position: absolute;
      transform: translateX(-3px);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    .sentItem:before {
      content: '';
      width: 9px;
      height: 100%;
      background-color: ${theme.errorColor};
      left: 0;
      top: 0;
      position: absolute;
      transform: translateX(-3px);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    .inboxItem:before {
      content: '';
      width: 9px;
      height: 100%;
      background-color: ${theme.successColor};
      left: 0;
      top: 0;
      position: absolute;
      transform: translateX(-3px);
      transition: opacity 340ms ease;
      transition: transform 340ms ease;
    }
    .inboxItem {
      position: relative;
    }
  `;
  return (
    <StyledDiv>
      <ul>{props.children}</ul>
    </StyledDiv>
  );
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  theme: PropTypes.object,
};

export default withTheme(Wrapper);
