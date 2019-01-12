import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import IconButton from '@material-ui/core/IconButton';
import Reply from '@material-ui/icons/Reply';
import ReplyAll from '@material-ui/icons/ReplyAll';
import Delete from '@material-ui/icons/Delete';
import Email from '@material-ui/icons/Email';
import Drafts from '@material-ui/icons/Drafts';
import Tooltip from 'components/StyledTooltip';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Icons = {
  reply: Reply,
  replyAll: ReplyAll,
  delete: Delete,
  markUnread: Email,
  markReaded: Drafts,
};

const MyIconButton = props => {
  const { theme, type, view, onClick } = props;
  const ShortView = styled(IconButton)`
    background-color: ${theme.backgroundColorLight} !important;
    color: ${theme.emailPartsColor}!important;
    box-shadow: 0px 0px 10px ${theme.emailItemShadow}; 
    padding: 4px !important;
    svg {
      height 18px;
      width: 18px;
    }
    position:relative !important;
    ::before {
        position: absolute;
        display: block;
        left: 13px;
        top: 13px;
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
      width: 26px;
      height: 26px;
    }
    @media (max-width: 768px) {
      padding: 6px !important;
      svg {
        height 22px;
        width: 22px;
      }
      ::before {
        left: 17px;
        top: 17px;
      }
    :hover::before {
      top: 0px;
      left: 0px;
      width: 34px;
      height: 34px;
    }
    }
  `;
  const FullView = styled(IconButton)`
    background-color: ${theme.backgroundColorLight} !important;
    border: 1px solid ${theme.sideBarBorderColor} !important;
    color: ${theme.emailPartsColor}!important;
    :hover {box-shadow: 0px 0px 10px ${theme.shadow2};} 
    padding: 4px !important;
    svg {
      height 18px;
      width: 18px;
    }
    @media (max-width: 768px) {
      margin:6px;
      svg {
        height: 16px;
        width: 16px;
      }
    }
  `;
  const StyledIcon = view === 'short' ? ShortView : FullView;
  const Icon = Icons[type];
  const tooltip = <FormattedMessage {...messages[type]} />;
  return (
    <Tooltip placement="top" title={tooltip}>
      <StyledIcon onClick={() => onClick()}>
        <Icon />
      </StyledIcon>
    </Tooltip>
  );
};

MyIconButton.propTypes = {
  theme: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default withTheme(MyIconButton);
