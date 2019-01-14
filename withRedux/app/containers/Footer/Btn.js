import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Reply from '@material-ui/icons/Reply';
import ReplyAll from '@material-ui/icons/ReplyAll';
import Forward from '@material-ui/icons/Forward';
import { withTheme } from '@callstack/react-theme-provider';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Icons = {
  reply: Reply,
  replyAll: ReplyAll,
  forward: Forward,
};

const Btn = props => {
  const { theme, type, handleClick } = props;
  const StyledButton = styled(Button)`
    color: ${theme.primaryTextColor} !important;
    margin: 16px 10px 16px 0px !important;
    padding: 8px 20px !important;

    border-color: ${theme.primaryTextColor} !important;
    :hover {
      background-color: ${theme.primaryTextColor} !important;
      color: white !important;
    }
    @media (max-width: 768px) {
      padding: 4px !important;
      min-width: 24px !important;
      & span:first-child {
        height: 36px !important;
        width: 36px !important;
      }
      & span:first-child svg {
        margin: 0px !important;
      }

      border-radius: 50% !important;
    }
  `;
  const HidingSpan = styled.span`
    @media (max-width: 768px) {
      display: none;
    }
  `;
  const Icon = Icons[type];
  const StyledIcon = styled(Icon)`
    margin-right: 8px !important;
  `;
  return (
    <StyledButton variant="outlined" onClick={() => handleClick()}>
      <StyledIcon />
      <HidingSpan>
        <FormattedMessage {...messages[type]} />
      </HidingSpan>
    </StyledButton>
  );
};

Btn.propTypes = {
  type: PropTypes.string,
  theme: PropTypes.object,
  handleClick: PropTypes.func,
};

export default withTheme(Btn);
