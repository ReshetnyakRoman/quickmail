import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/SendToInput/messages';
import PropTypes from 'prop-types';

function Subject(props) {
  const { view, theme, emailInfo } = props;
  const StyledDiv = styled.div`
    color: ${theme.primaryTextColor};
    font-size: 0.8rem;
    margin-top: ${view === 'full' ? '2px' : '0.2rem'};
    margin-bottom: ${view === 'full' ? '0px' : '4px'};

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `;
  const StyledSpan = styled.span`
    color: ${theme.secondryTextColor};
    margin-right: ${view === 'full' ? '4px' : '0px'};
  `;
  return (
    <StyledDiv>
      <StyledSpan className="text-black-50">
        {view === 'full' ? <FormattedMessage {...messages.subject} /> : null}
      </StyledSpan>
      {emailInfo.subject}
    </StyledDiv>
  );
}
Subject.propTypes = {
  theme: PropTypes.object,
  view: PropTypes.string,
};
export default withTheme(Subject);
