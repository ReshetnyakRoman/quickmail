import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import PropTypes from 'prop-types';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/EmailIn/messages';

function MailFrom(props) {
  const { emailInfo, theme, view } = props;
  const name = emailInfo.from.name ? emailInfo.from.name : emailInfo.from.email;

  const isUnreaded = emailInfo.isUnreaded ? '' : 'd-none';
  const showElem = ['d-none', ''];
  const isFull = props.view === 'full' ? 1 : 0;
  const fontWeight = ['font-weight-bold', ''];

  const Wrapper = styled.div`
    position: static;
    margin-bottom: 0.25rem !important;
    cursor: context-menu;
  `;
  const StyledDiv = styled.div`
    color: ${theme.primaryTextColor};
    font-size: 0.8rem;
    font-weight: ${view === 'full' ? 'normal' : 'bold'} !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `;
  const StyledIcon = styled(FiberManualRecord)`
    transform: translateY(-2px);
    height: 12px !important;
    width: 12px !important;
    margin-right: 0.25rem !important;
    color: ${theme.infoColor};
    display: ${emailInfo.isUnreaded ? 'inline-block' : 'none'} !important;
  `;
  const StyledFrom = styled.span`
    color: ${theme.primaryTextColor};
    display: ${view === 'full' ? 'inline-block' : 'none'};
  `;
  const ToolTip = styled.div`
    font-size: 80%;
    font-weight: 400;
    color: ${theme.secondryTextColor};
    visibility: hidden;
    position: absolute;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    background-color: ${theme.emailToolTipBG};
    left: 50px;
    padding: 0.6rem;
    z-index: 5;
    transform: translate(10px, 10px);
    opacity: 0;

    ${Wrapper}:hover & {
      cursor: text;
      transform: translate(0px, 0px);
      visibility: visible;
      opacity: 1;
      transition: all 300ms ease;
      transition-delay: 0.7s;
    }

    .invalid-email {
      background-color: ${theme.warningColor} !important;
      white-space: nowrap;
      color: #000 !important;
    }
    @media (max-width: 768px) {
      left: 20px;
    }
  `;

  return (
    <Wrapper>
      <StyledDiv>
        <StyledIcon />
        <StyledFrom>
          <FormattedMessage {...messages.from} />{' '}
        </StyledFrom>
        <span>{name}</span>
      </StyledDiv>
      <ToolTip>
        e-mail:&nbsp;
        <span style={{ color: theme.infoColor }}>{emailInfo.from.email}</span>
      </ToolTip>
    </Wrapper>
  );
}

MailFrom.propTypes = {
  emailInfo: PropTypes.object,
  view: PropTypes.string,
  theme: PropTypes.object,
};

export default withTheme(MailFrom);
