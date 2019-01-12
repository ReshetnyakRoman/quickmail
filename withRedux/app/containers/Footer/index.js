import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { domainName } from 'config';
import {
  replyEmail,
  updateReplyEmailData,
  updateOpenEmailData,
} from 'containers/Mailbox/actions';
import { updateContentBoxStatus } from 'containers/App/actions';
import { makeSelectUserInfo } from 'containers/LoginWithSocials/selectors';
import { makeSelectOpenEmailData } from 'containers/Mailbox/selectors';
import Btn from './Btn';

function Footer(props) {
  const { currentUser, email, handleReply } = props;
  const StyledFooter = styled.footer`
    margin: 8px;
    display: flex;
    @media (max-width: 768px) {
      justify-content: space-around;
    }
  `;

  return (
    <StyledFooter>
      <Btn
        type="reply"
        handleClick={() => handleReply('reply', email, currentUser)}
      />
      <Btn
        type="replyAll"
        handleClick={() => handleReply('replyAll', email, currentUser)}
      />
      <Btn
        type="forward"
        handleClick={() => handleReply('forward', email, currentUser)}
      />
    </StyledFooter>
  );
}

Footer.propTypes = {
  handleReply: PropTypes.func,
  currentUser: PropTypes.object,
  email: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectUserInfo(),
  email: makeSelectOpenEmailData(),
});

const mapDispatchToProps = dispatch => ({
  handleReply: (replyType, email, currentUser) => {
    const subject =
      replyType === 'forward'
        ? `Fwd: ${email.subject}`
        : `Re: ${email.subject}`;
    let to = [];
    let cc = [];
    if (replyType === 'reply') to = [email.from];
    if (replyType === 'replyAll') {
      to = [email.from];
      cc = [
        ...email.cc,
        ...email.to.filter(recipient => recipient.email !== currentUser.email),
      ];
    }
    const ReplyEmailObjProps = {
      subject,
      MessageID: `<new${Date.now()}${domainName}>`,
      attachments: email.attachments,
      from: {
        email: currentUser.email,
        name: currentUser.name,
      },
      to,
      cc,
    };
    dispatch(replyEmail(replyType));
    dispatch(updateReplyEmailData(ReplyEmailObjProps));
    dispatch(updateOpenEmailData(email));
    dispatch(updateContentBoxStatus('EmailIn'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
