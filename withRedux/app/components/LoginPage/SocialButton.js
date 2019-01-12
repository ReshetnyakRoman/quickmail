import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import UnstyledLink from '../UnstyledLink';
import VKicon from './img/vk-logo.svg';
import FBicon from './img/facebook-logo.png';

const StyledButton = styled.button`
  position: relative;
  margin: 10px;
  width: 230px;
  height: 40px;
  border-radius: 80px;
  color: #fff;
  font-family: tahoma;
  font-size: 12px !important;
  outline: 0;
  border: none;
  cursor: pointer;
  background-color: 
  ${props => (props.LoginType === 'VK' ? '#5181b8;' : '#3b5998;')}
  
  :hover {
    background-color: 
      ${props => (props.LoginType === 'VK' ? '#3b6391;' : '#2b406e;')}
    opacity: 0.8;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
    filter: alpha(opacity=80);
  }

  & img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.2);
    padding: 6px;
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;

const SocialButton = props => (
  <UnstyledLink to="/">
    <StyledButton onClick={() => props.onClick()} LoginType={props.LoginType}>
      <FormattedMessage {...messages.loginWithMessage} />{' '}
      {props.LoginType === 'FB' ? (
        <img src={FBicon} alt="Facebook icon" />
      ) : (
        <img src={VKicon} alt="VK icon" />
      )}
    </StyledButton>
  </UnstyledLink>
);

SocialButton.propTypes = {
  LoginType: PropTypes.string,
  onClick: PropTypes.func,
};

export default SocialButton;
