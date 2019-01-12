import styled from 'styled-components';
import React from 'react';

import SendToInput from 'containers/SendToInput';

const ReplySectionHeader = props => {
  const StyledDiv = styled.div`
    margin: 16px 16px 0px 16px;
    div {
      margin-bottom: 4px;
    }
  `;

  return (
    <StyledDiv>
      <SendToInput isChangable emailType="reply" prefix="to" />

      <SendToInput isChangable emailType="reply" prefix="copy" />
    </StyledDiv>
  );
};

export default ReplySectionHeader;
