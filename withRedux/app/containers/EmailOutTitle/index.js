import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircleBtn from 'components/CircleBtn';
import Send from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AttachFile from 'components/AttachFile';
import { FormattedMessage } from 'react-intl';
import { withTheme } from '@callstack/react-theme-provider';
import { createStructuredSelector } from 'reselect';
import { makeSelectScreenType } from 'containers/App/selectors';
import {
  updateReplyEmailData,
  updateNewEmailData,
  closeReplyEmail,
  deleteDraft,
  sendEmail,
  closeNewEmail,
} from 'containers/Mailbox/actions';
import messages from './messages';
import Wrapper from './Wrapper';
import StyledDiv from './StyledDiv';

function EmailOutTitle(props) {
  const {
    emailType,
    theme,
    closeReplyEmail,
    closeNewEmail,
    sendEmail,
    updateReplyEmailData,
    updateNewEmailData,
    deleteDraft,
    screnType,
  } = props;

  const updateEmailData =
    emailType === 'reply' ? updateReplyEmailData : updateNewEmailData;
  const isReply = emailType === 'reply';
  const color = isReply ? theme.infoColor : '#fff';
  const bgColor = isReply ? theme.backgroundColorLight : theme.infoColor;
  const draftType = emailType === 'reply' ? 'ReplyEmail' : 'NewEmail';
  const closeEmail = emailType === 'reply' ? closeReplyEmail : closeNewEmail;

  const closeEmailBtn = isReply ? null : (
    <CircleBtn
      tooltip={<FormattedMessage {...messages.closeEmail} />}
      textColor={color}
      bgColor={bgColor}
      size={24}
      onClick={() => closeEmail()}
      onTouchEnd={() => closeEmail()}
    >
      <CloseIcon />
    </CircleBtn>
  );
  if (screnType !== 'desktop') {
    return (
      <Wrapper bgColor={bgColor} isReply={isReply}>
        <CircleBtn
          tooltip={<FormattedMessage {...messages.send} />}
          size={24}
          textColor={color}
          bgColor={bgColor}
          onClick={() => sendEmail(draftType)}
          onTouchEnd={() => sendEmail(draftType)}
        >
          <Send />
        </CircleBtn>

        <AttachFile
          tooltip={<FormattedMessage {...messages.attachFiles} />}
          textColor={color}
          bgColor={bgColor}
          size={24}
          onEmailDataChange={files => updateEmailData({ attachments: files })}
        />

        <CircleBtn
          tooltip={<FormattedMessage {...messages.deleteDraft} />}
          size={24}
          textColor={color}
          bgColor={bgColor}
          onClick={() => deleteDraft(draftType)}
          onTouchEnd={() => deleteDraft(draftType)}
        >
          <DeleteForever />
        </CircleBtn>
        {closeEmailBtn}
      </Wrapper>
    );
  }

  return (
    <StyledDiv isReply={isReply} theme={theme}>
      <FormattedMessage {...messages.emailHeader} />

      <CircleBtn
        tooltip={<FormattedMessage {...messages.closeEmail} />}
        textColor="#fff"
        bgColor={theme.emailHeader}
        onClick={() => closeEmail()}
        onTouchEnd={() => closeEmail()}
      >
        <CloseIcon />
      </CircleBtn>
    </StyledDiv>
  );
}

EmailOutTitle.propTypes = {
  screnType: PropTypes.string,
  updateReplyEmailData: PropTypes.func,
  closeReplyEmail: PropTypes.func,
  closeNewEmail: PropTypes.func,
  deleteDraft: PropTypes.func,
  sendEmail: PropTypes.func,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  screnType: makeSelectScreenType(),
});

const mapDispatchToProps = {
  updateNewEmailData,
  updateReplyEmailData,
  closeReplyEmail,
  closeNewEmail,
  deleteDraft,
  sendEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(EmailOutTitle));
