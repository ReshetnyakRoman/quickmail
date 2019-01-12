import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import { makeSelectOpenEmailData } from 'containers/Mailbox/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

function EmailBody(props) {
  const markUp = { __html: props.emailInfo.body };
  const StyledDiv = styled.div`
    padding: 8px;
    margin: 8px;
    word-wrap: break-word;
    color: ${props.theme.primaryTextColor};
  `;
  return <StyledDiv dangerouslySetInnerHTML={markUp} />;
}

EmailBody.propTypes = {
  emailInfo: PropTypes.object,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  emailInfo: makeSelectOpenEmailData(),
});

export default connect(
  mapStateToProps,
  null,
)(withTheme(EmailBody));
