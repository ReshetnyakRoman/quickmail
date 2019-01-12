import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Logo from './Logo';

const LocalWrapper = styled.div`
  padding-bottom: 3rem;
`;
const WelcomeText = styled.span`
  color: #fff;
  font-size: 12px;
`;

const Header = () => (
  <LocalWrapper>
    <WelcomeText>
      <FormattedMessage {...messages.welcomeMessage} />
    </WelcomeText>
    <br />
    <Logo />
  </LocalWrapper>
);

export default Header;
