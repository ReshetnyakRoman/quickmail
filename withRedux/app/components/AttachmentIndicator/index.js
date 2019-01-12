import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';
import Attachment from '@material-ui/icons/Attachment';

function AttachmentIndicator(props) {
  const { theme, emailInfo, view } = props;
  const StyledDiv = styled.div`
    color: ${theme.secondryTextColor};
    text-align: center;
    display: ${emailInfo.attachments.length ? 'inline-block' : 'none'};
    ${view === 'short'
      ? 'padding-top:0.25rem;'
      : 'position: absolute; right: 1%; top: 50%; transform: translate(0%, -50%);'};
  `;
  const StyledIcon = styled(Attachment)`
    height: 20px !important;
    width: 20px !important;
  `;
  return (
    <StyledDiv>
      <StyledIcon />
    </StyledDiv>
  );
}
AttachmentIndicator.propTypes = {
  theme: PropTypes.object,
  emailInfo: PropTypes.object,
  view: PropTypes.string,
};
export default withTheme(AttachmentIndicator);
