import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const About = () => (
  <LocalWrapper>
    <FormattedMessage {...messages.aboutProjectMessage} />
    <PopUp className="PopUp">
      <FormattedMessage {...messages.aboutProjectHeader} />
      <ul>
        <li>
          <FormattedMessage {...messages.aboutProjectListItem1} />
        </li>
        <li>
          <FormattedMessage {...messages.aboutProjectListItem2} />
        </li>
        <li>
          <FormattedMessage {...messages.aboutProjectListItem3} />
        </li>
      </ul>
    </PopUp>
  </LocalWrapper>
);

export default About;

const LocalWrapper = styled.div`
  color: #fff;
  position: relative;
  font-size: 10px;
  padding-top: 3rem;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  :hover .PopUp {
    -webkit-transform: translate(-35px, 0px);
    -moz-transform: translate(-35px, 0px);
    -o-transform: translate(-35px, 0px);
    -ms-transform: translate(-35px, 0px);
    transform: translate(-35px, 0px);
    visibility: visible;
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transition: all 300ms ease;
    -moz-transition: all 300ms ease;
    -o-transition: all 300ms ease;
    -ms-transition: all 300ms ease;
    transition: all 300ms ease;
    -webkit-transition-delay: 0.5s;
    -moz-transition-delay: 0.5s;
    -o-transition-delay: 0.5s;
    -ms-transition-delay: 0.5s;
    transition-delay: 0.5s;
  }
`;

const PopUp = styled.div`
  width: 320px;
  color: #fff;
  font-size: 11px;
  visibility: hidden;
  position: absolute;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  left: 0%;
  padding: 1rem;
  z-index: 5;
  -webkit-transform: translate(0px, 20px);
  -moz-transform: translate(0px, 20px);
  -o-transform: translate(0px, 20px);
  -ms-transform: translate(0px, 20px);
  transform: translate(0px, 20px);
  opacity: 0;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  text-align: left;
  }

  & ul {
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
