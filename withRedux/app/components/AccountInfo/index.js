import React from 'react';
import UnstyledLink from 'components/UnstyledLink';
import PropTypes from 'prop-types';
import MyAccountInfo from './MyAccountInfo';
import Triangle from './Triangle';
import MyAccountInfoSettings from './MyAccountInfoSettings';
import UserNameText from './UserNameText';
import EmailText from './EmailText';
import Options from './Options';
import LogoutButton from './LogoutButton';
import OtherOpt from './OtherOpt';

export default function AccountInfo(props) {
  const { name, email } = props.user;
  return (
    <MyAccountInfo className="my-account-info">
      <Triangle />
      <MyAccountInfoSettings>
        <UserNameText>{name}</UserNameText>
        <EmailText>{email}</EmailText>
        <Options>
          <UnstyledLink to="/welcome">
            <LogoutButton onClick={() => props.logout()}>
              {props.exitText}
            </LogoutButton>
          </UnstyledLink>
          <OtherOpt>
            <svg>
              <circle cx="35%" cy="50%" r="2" />
              <circle cx="50%" cy="50%" r="2" />
              <circle cx="65%" cy="50%" r="2" />
            </svg>
          </OtherOpt>
        </Options>
      </MyAccountInfoSettings>
    </MyAccountInfo>
  );
}

AccountInfo.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  exitText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
