import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';

function Snippet(props) {
  const { theme, emailInfo } = props;
  const StyledDiv = styled.div`
    color: ${theme.secondryTextColor};
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 300;
  `;
  return <StyledDiv>{emailInfo.snippet}</StyledDiv>;
}
Snippet.propTypes = {
  theme: PropTypes.object,
  emailInfo: PropTypes.object,
};
export default withTheme(Snippet);
