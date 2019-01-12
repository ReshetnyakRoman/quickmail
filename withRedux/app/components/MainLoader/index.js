/*
 * This is main loader which user see while app loading
 * and getting authorization info from VK and FB socials
 * to define logged in status
 * if logged in it'll redirect to /inbox other wise to /welcome
*/

import React from 'react';
import withLoginToSocials from 'containers/LoginWithSocials/WithLoginToSocials';
import connectToSocials from 'containers/LoginWithSocials/ConnectToSocials';
import ProgressBar from './ProgressBar';
import { Wrapper, ProgressWrapper } from './Wrappers';
import LoaderContainer from './LoaderContainer';
import Envelope, {
  EnvelopeLeft,
  EnvelopeRight,
  EnvelopeTop,
  EnvelopeContent,
} from './Envelope';

const MainLoader = () => (
  <Wrapper>
    <LoaderContainer>
      <Envelope>
        <EnvelopeLeft />
        <EnvelopeRight />
      </Envelope>
      <EnvelopeContent />
      <EnvelopeTop />
    </LoaderContainer>
    <ProgressWrapper>
      <ProgressBar />
    </ProgressWrapper>
  </Wrapper>
);

export { MainLoader };

const MainLoadeWithLoginCheck = withLoginToSocials(
  connectToSocials(MainLoader),
);
export default MainLoadeWithLoginCheck;
