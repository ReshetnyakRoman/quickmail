import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import StyledTooltip from 'components/StyledTooltip';

const defauldSize = 18;
const StyledBtn = styled(IconButton)`
      background-color: ${props => props.bgColor} !important;
      color: ${props => props.textColor} !important;
      padding: 4px !important;
      svg {
        height ${props => (props.size ? props.size : defauldSize)}px;
        width: ${props => (props.size ? props.size : defauldSize)}px;
      }
      position:relative !important;
      ::before {
          position: absolute;
          display: block;
          left: ${props => (props.size ? (props.size + 8) / 2 : 13)}px;
          top: ${props => (props.size ? (props.size + 8) / 2 : 13)}px;
          content: ' ';
          width: 0px;
          height: 0px;
          background-color: rgba(0,0,0,0.2);
          transition: 0.2s ease-in-out;
          border-radius: 50%;
          z-index: 2;
        }
      :hover::before {
        content: '';
        top: 0px;
        left: 0px;
        width: ${props => (props.size ? props.size + 8 : 26)}px;
        height: ${props => (props.size ? props.size + 8 : 26)}px;
      }
    `;

const CircleBtn = props => {
  const { tooltip, children, ...other } = props;
  if (props.tooltip)
    return (
      <StyledTooltip title={tooltip}>
        <StyledBtn {...other}>{children}</StyledBtn>
      </StyledTooltip>
    );
  return <StyledBtn {...other}>{children}</StyledBtn>;
};

export default CircleBtn;

const StyledSpan = styled.span`
      background-color: ${props => props.bgColor} !important;
      color: ${props => props.textColor} !important;
      padding: 4px !important;
      svg {
        height ${props => (props.size ? props.size : defauldSize)}px;
        width: ${props => (props.size ? props.size : defauldSize)}px;
      }
      position:relative !important;
      ::before {
          position: absolute;
          display: block;
          left: ${props => (props.size ? (props.size + 8) / 2 : 13)}px;
          top: ${props => (props.size ? (props.size + 8) / 2 : 13)}px;
          content: ' ';
          width: 0px;
          height: 0px;
          background-color: rgba(0,0,0,0.2);
          transition: 0.2s ease-in-out;
          border-radius: 50%;
          z-index: 2;
        }
      :hover::before {
        content: '';
        top: 0px;
        left: 0px;
        width: ${props => (props.size ? props.size + 8 : 26)}px;
        height: ${props => (props.size ? props.size + 8 : 26)}px;
      }
    `;

const StyledIcon = props => {
  const { tooltip, children, ...other } = props;
  if (props.tooltip)
    return (
      <StyledTooltip title={tooltip}>
        <StyledSpan {...other}>{children}</StyledSpan>
      </StyledTooltip>
    );
  return <StyledSpan {...other}>{children}</StyledSpan>;
};

export { StyledIcon };
