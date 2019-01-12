import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { domainName } from 'config';
import IconButton from './StyledIcon';
import {
  moveEmail,
  deleteEmail,
  markUnreadedAtServer,
  replyEmail,
  updateReplyEmailData,
  updateOpenEmailData,
} from '../Mailbox/actions';
import { updateContentBoxStatus } from '../App/actions';
import { makeSelectUserInfo } from '../LoginWithSocials/selectors';
import { makeSelectCurrentFolder } from '../App/selectors';

function EmailControls(props) {
  const {
    view,
    folder,
    email,
    currentUser,
    handleMarkUnreaded,
    handleDeleteEmail,
    handleReply,
  } = props;
  const status = email.isUnreaded ? 'markReaded' : 'markUnread';
  const Wrapper = styled.div`
    cursor: pointer;
    display: block;
    position: ${view === 'short' ? 'absolute' : 'relative'};
    top: -1.4rem;
    right: ${view === 'short' ? '10%' : 0};
    width: 180px;
    z-index: 2;
    flex-wrap: nowrap;
    align-items: flex-start;
    button {
      opacity: ${view === 'short' ? 0 : 1};
      margin: 0.5rem;
      border-radius: 100%;
      transition: all 200ms ease;
      transform: translateY(10px);
    }
    @media (max-width: 768px) {
      top: -0.7rem;
      right: -6px;
      width: 180px;
    }
  `;
  const ReplyAll =
    view === 'short' ? null : (
      <IconButton
        onClick={() => handleReply('replyAll', email, currentUser)}
        type="replyAll"
        view={view}
      />
    );

  return (
    <Wrapper>
      <IconButton
        onClick={() => handleReply('reply', email, currentUser)}
        type="reply"
        view={view}
      />
      {ReplyAll}
      <IconButton
        onClick={() => handleDeleteEmail(folder, email.emailId)}
        type="delete"
        view={view}
      />
      <IconButton
        onClick={() => handleMarkUnreaded(email.emailId, !email.isUnreaded)}
        type={status}
        view={view}
      />
    </Wrapper>
  );
}

EmailControls.propTypes = {
  handleMarkUnreaded: PropTypes.func,
  handleDeleteEmail: PropTypes.func,
  handleReply: PropTypes.func,
  currentUser: PropTypes.object,
  folder: PropTypes.string,
  email: PropTypes.object,
  view: PropTypes.string,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectUserInfo(),
  folder: makeSelectCurrentFolder(),
});

const mapDispatchToProps = dispatch => ({
  handleMarkUnreaded: (uid, status) =>
    dispatch(markUnreadedAtServer(uid, status)),
  handleDeleteEmail: (folder, uid) => {
    if (folder === 'Trash') dispatch(deleteEmail(uid));
    else dispatch(moveEmail('Trash', uid));
  },
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
)(EmailControls);
