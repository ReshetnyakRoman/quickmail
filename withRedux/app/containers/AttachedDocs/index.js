import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormatBytes from 'utils/formatBytes';
import { withTheme } from '@callstack/react-theme-provider';
import { updateReplyEmailData, updateNewEmailData } from '../Mailbox/actions';
import {
  makeSelectNewEmailObj,
  makeSelectReplyEmailObj,
} from '../Mailbox/selectors';

function AttachedDocs(props) {
  const { onChange, replyEmailObj, newEmailObj, emailType, theme } = props;

  let attachments =
    emailType === 'reply' ? replyEmailObj.attachments : newEmailObj.attachments;

  if (attachments.length === 0) {
    return null;
  }

  const StyledP = styled.p`
    font-weight:bold;
    border: 1px solid ${theme.sideBarBorderColor};
    background-color: ${theme.badegBG};
    color: ${theme.primaryTextColor};
    font-size: 0.8rem;
    font-family: inherit;
    margin:4px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    :hover,
    :hover:focus {
     background-color: ${theme.sideBarBorderColor};
    }
  }
  `;
  const StyledDiv = styled.div`
    display: flex;
    padding: 0 16px;
    margin: 8px 0;
    flex-wrap: wrap;
  `;

  attachments = attachments.map((file, index) => (
    <StyledP key={file.name}>
      <span
        title={file.name}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '120px',
        }}
      >
        {file.name}
        &nbsp;
      </span>
      <span style={{ color: theme.secondryTextColor }}>
        ({FormatBytes(file.size)})
      </span>
      <span
        onClick={() => onChange({ delete: file.name })}
        style={{ cursor: 'pointer', paddingLeft: '16px' }}
      >
        &times;
      </span>
    </StyledP>
  ));

  return (
    <StyledDiv className="d-flex px-4 my-2 flex-wrap">{attachments}</StyledDiv>
  );
}

AttachedDocs.propTypes = {
  onChange: PropTypes.func,
  emailType: PropTypes.string,
  theme: PropTypes.object,
  replyEmailObj: PropTypes.object,
  newEmailObj: PropTypes.object,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: fileToDelete => {
    if (ownProps.emailType === 'reply') {
      dispatch(updateReplyEmailData(fileToDelete));
    } else {
      dispatch(updateNewEmailData(fileToDelete));
    }
  },
});

const mapStateToProps = createStructuredSelector({
  replyEmailObj: makeSelectReplyEmailObj(),
  newEmailObj: makeSelectNewEmailObj(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(AttachedDocs));
