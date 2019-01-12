/*
 * This is Login page
 * From here user can login with FB of VK socials
 * It's rendered when user not logged in 
 * It's connected to HOC which perform login action
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Wrapper from './Wrapper';
import Gradient from './Gradient';
import InnerWrapper from './InnerWrapper';
import Header from './Header';
import Content from './Content';
import SocialButton from './SocialButton';
import Hr from './Hr';
import About from './About';
import withLoginToSocials from '../../containers/LoginWithSocials/WithLoginToSocials';

const LoginPage = props => {
  return (
    <Wrapper>
      <Helmet>
        <title>Welcome to QuickMail</title>
        <meta
          name="description"
          content="Welcome and Login page for QuickMail"
        />
      </Helmet>
      <Gradient />
      <InnerWrapper>
        <Content>
          <Header />
          <SocialButton LoginType="FB" onClick={() => props.login('FB')} />
          <Hr />
          <SocialButton LoginType="VK" onClick={() => props.login('VK')} />
          <About />
        </Content>
      </InnerWrapper>
    </Wrapper>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

const LoginPageWithLoginToSocials = withLoginToSocials(LoginPage);
export default LoginPageWithLoginToSocials;
