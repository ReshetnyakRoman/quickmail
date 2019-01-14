import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Attachments from 'components/Attachments';
import EmailBody from 'components/EmailBody';
import Footer from 'containers/Footer';
import styled from 'styled-components';
import { updateContentBoxStatus } from '../App/actions';
import Wrapper from './Wrapper';
import ErrorBoundary from '../ErrorBoundary';
import {
  makeSelectOpenEmailData,
  makeSelectReplyEmailStatus,
} from 'containers/Mailbox/selectors';
import EmailHeader from '../EmailHeader';
import ReplySection from '../ReplySection';

class EmailIn extends React.PureComponent {
  render() {
    const { replyEmailStatus } = this.props;

    const footer =
      replyEmailStatus === 'closed' ? <Footer /> : <ReplySection />;
    const replySection =
      replyEmailStatus === 'closed' ? null : <ReplySection />;
    return (
      <Wrapper>
        <ErrorBoundary>
          <EmailHeader />
          <EmailBody />
          <Attachments />
          {footer}
        </ErrorBoundary>
      </Wrapper>
    );
  }
}

EmailIn.propTypes = {
  replyEmailStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  replyEmailStatus: makeSelectReplyEmailStatus(),
});

export default connect(
  mapStateToProps,
  null,
)(EmailIn);
