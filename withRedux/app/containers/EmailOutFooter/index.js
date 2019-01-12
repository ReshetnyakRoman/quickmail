import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircleBtn from 'components/CircleBtn';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AttachFile from 'components/AttachFile';
import { FormattedMessage } from 'react-intl';
import { withTheme } from '@callstack/react-theme-provider';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectScreenType,
  makeSelectIsSaveIndVisible,
} from 'containers/App/selectors';
import {
  updateReplyEmailData,
  updateNewEmailData,
  deleteDraft,
  sendEmail,
} from 'containers/Mailbox/actions';
import MyBlueBtn from 'components/MyBlueBtn';
import SavedInd from './SavedInd';
import Wrapper from './Wrapper';
import messages from '../EmailOutTitle/messages';

function EmailOutFooter(props) {
  const {
    sendEmail,
    updateReplyEmailData,
    updateNewEmailData,
    deleteDraft,
    screnType,
    emailType,
    theme,
    isSavedIndVisible,
  } = props;

  const updateEmailData =
    emailType === 'reply' ? updateReplyEmailData : updateNewEmailData;

  const isVisible = props.screnType === 'desktop';
  const draftType = emailType === 'reply' ? 'ReplyEmail' : 'NewEmail';
  return isVisible ? (
    <Wrapper>
      <MyBlueBtn onClick={() => sendEmail(draftType)}>
        <FormattedMessage {...messages.send} />
      </MyBlueBtn>
      <AttachFile
        tooltip={<FormattedMessage {...messages.attachFiles} />}
        textColor={theme.secondryTextColor}
        bgColor={theme.backgroundColorLight}
        size={24}
        onEmailDataChange={files => updateEmailData({ attachments: files })}
      />

      <CircleBtn
        tooltip={<FormattedMessage {...messages.deleteDraft} />}
        size={24}
        textColor={theme.secondryTextColor}
        bgColor={theme.backgroundColorLight}
        onClick={() => deleteDraft(draftType)}
        onTouchEnd={() => deleteDraft(draftType)}
      >
        <DeleteForever />
      </CircleBtn>
      <SavedInd isVisible={isSavedIndVisible[draftType]} theme={theme} />
    </Wrapper>
  ) : null;
}

EmailOutFooter.propTypes = {
  emailType: PropTypes.string,
  screnType: PropTypes.string,
  updateReplyEmailData: PropTypes.func,
  deleteDraft: PropTypes.func,
  sendEmail: PropTypes.func,
  theme: PropTypes.object,
  isSavedIndVisible: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  screnType: makeSelectScreenType(),
  isSavedIndVisible: makeSelectIsSaveIndVisible(),
});

const mapDispatchToProps = {
  updateReplyEmailData,
  updateNewEmailData,
  deleteDraft,
  sendEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(EmailOutFooter));
