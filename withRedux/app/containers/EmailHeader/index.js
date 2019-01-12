import React from 'react';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import { connect } from 'react-redux';
import Avatar from 'components/Avatar';
import Subject from 'components/Subject';
import AttachmentIndicator from 'components/AttachmentIndicator';
import ReceivingDate from 'components/ReceivingDate';
import CircleBtn from 'components/CircleBtn';
import EmailControls from 'containers/EmailControls';
import CollapseDetails from 'components/CollapseDetails';
import SendToInput from 'containers/SendToInput';
import UnstyledLink from 'components/UnstyledLink';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { makeSelectCurrentFolder } from '../App/selectors';
import { updateOpenEmailData, closeReplyEmail } from '../Mailbox/actions';
import { updateContentBoxStatus } from '../App/actions';
import { makeSelectOpenEmailData } from '../Mailbox/selectors';

class EmailHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteEmail = this.handleDeleteEmail.bind(this);
    this.state = { isDetailsVisible: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isDetailsVisible !== this.state.isDetailsVisible) return true;
    if (nextProps.replyEmailStatus === this.props.replyEmailStatus)
      return false;
    if (nextProps.emailInfo === this.props.emailInfo) return false;

    return true;
  }

  handleDeleteEmail(email) {
    this.props.onDeleteEmailClick(email);
  }

  render() {
    const { emailInfo, currentFolder, handleCloseClick, theme } = this.props;
    const ShowDetails = this.state.isDetailsVisible ? null : (
      <CollapseDetails
        onShowDetailsClick={() => this.setState({ isDetailsVisible: true })}
      />
    );
    const StyledDiv = styled.div`
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;
    const StyledDiv2 = styled.div`
      width: 100%;
      display: flex;
      justify-content: space-between;
    `;
    const Details = styled.div`
      @media (max-width: 768px) {
        display: ${this.state.isDetailsVisible ? 'block' : 'none'};
      }
    `;

    return (
      <header style={{ padding: '0.5rem' }}>
        <StyledDiv2>
          <EmailControls view="full" email={emailInfo} />
          <UnstyledLink to={`/${currentFolder.toLowerCase()}`}>
            <CircleBtn
              textColor={theme.primaryTextColor}
              bgColor={theme.backgroundColorLight}
              onClick={() => handleCloseClick()}
              onTouchEnd={() => handleCloseClick()}
            >
              <CloseIcon />
            </CircleBtn>
          </UnstyledLink>
        </StyledDiv2>

        <div style={{ display: 'flex', padding: '0.25rem' }}>
          <Avatar user={emailInfo} type="square2" />
          <StyledDiv>
            <div style={{ position: 'relative', marginBottom: '4px' }}>
              <SendToInput recipentsList={[emailInfo.from]} prefix="from" />
              <ReceivingDate emailInfo={emailInfo} view="full" />
            </div>
            <AttachmentIndicator
              emailInfo={emailInfo}
              className="attachments-ind-position"
            />
            {ShowDetails}
            <Details>
              <SendToInput recipentsList={emailInfo.to} prefix="to" />
              <SendToInput recipentsList={emailInfo.cc} prefix="copy" />
            </Details>
            <Subject emailInfo={emailInfo} view="full" />
          </StyledDiv>
        </div>
      </header>
    );
  }
}
EmailHeader.propTypes = {
  emailInfo: PropTypes.object,
  currentFolder: PropTypes.string,
  handleCloseClick: PropTypes.func,
  theme: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  currentFolder: makeSelectCurrentFolder(),
  emailInfo: makeSelectOpenEmailData(),
});

const mapDispatchToProps = dispatch => ({
  handleCloseClick: () => {
    dispatch(updateContentBoxStatus('EmailList'));
    dispatch(updateOpenEmailData(''));
    dispatch(closeReplyEmail());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(EmailHeader));
