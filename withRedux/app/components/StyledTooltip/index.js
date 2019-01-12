import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { withTheme } from '@callstack/react-theme-provider';

const StyledTooltip = styled(({ className, theme, ...other }) => (
  <Tooltip classes={{ popper: className, tooltip: 'tooltip' }} {...other} />
))`
  & .tooltip {
    background-color: ${props => props.theme.tooltipBackGround};
    color: ${props => props.theme.tooltipColor};
  }
`;

export default withTheme(StyledTooltip);
