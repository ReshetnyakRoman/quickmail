import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from '../EmailOutTitle/messages';

function SavedInd(props) {
  const { isVisible, theme } = props;
  const StyledSpan = styled.span`
    color: ${theme.secondryTextColor};
    display: ${isVisible ? 'inline-block' : 'none'};
    position: absolute;
    right: 16px;
  `;
  return (
    <StyledSpan>
      <FormattedMessage {...messages.draftSaved} />
    </StyledSpan>
  );
}

export default SavedInd;
