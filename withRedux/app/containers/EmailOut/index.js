import React from 'react';
import AttachedDocs from 'containers/AttachedDocs';
import AnimWrapper from './AnimWrapper';
import EmailOutHeader from '../EmailOutHeader';
import EmailOutBody from '../EmailOutBody';
import EmailOutFooter from '../EmailOutFooter';
import { makeSelectNewEmailStatus } from '../Mailbox/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

const EmailOut = props => {
  return props.newEmailStatus !== 'closed' ? (
    <AnimWrapper>
      <EmailOutHeader />
      <EmailOutBody />
      <AttachedDocs emailType="NewEmail" />
      <EmailOutFooter emailType="NewEmail" />
    </AnimWrapper>
  ) : null;
};

EmailOutBody.propTypes = {
  newEmailStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  newEmailStatus: makeSelectNewEmailStatus(),
});

export default connect(
  mapStateToProps,
  null,
)(EmailOut);
