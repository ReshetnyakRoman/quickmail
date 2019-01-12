import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateNewEmailData } from 'containers/Mailbox/actions';
import { withTheme } from '@callstack/react-theme-provider';
import { FormattedMessage } from 'react-intl';
import messages from '../EmailOutTitle/messages';
import EmailOutTitle from '../EmailOutTitle';
import SendToInput from '../SendToInput';
import styled from 'styled-components';

class EmailOutHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCopyVisible: false };
  }

  render() {
    const { isCopyVisible } = this.state;

    const copyInput = isCopyVisible ? (
      <SendToInput
        isChangable
        prefix="copy"
        isUnderlined
        emailType="NewEmail"
      />
    ) : null;

    const StyledDiv = styled.div`
      display: flex;
      margin-bottom: 4px;
      border-bottom: 1px solid ${this.props.theme.sideBarBorderColor};
      justify-content: space-between;
      @media (max-width: 768px) {
        padding-top: 8px;
      }
    `;
    const StyledCopyBtn = styled.div`
      color: ${this.props.theme.secondryTextColor};
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.8rem;
      display: ${isCopyVisible ? 'none' : 'inline-block'};
    `;
    const StyledInput = styled.input`
      color: ${this.props.theme.primaryTextColor};
      display: inline-block;
      border: none;
      box-flex: 8;
      flex-grow: 8;
      padding: 0;
      margin: 0;
      outline-width: 0;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.82rem;
      width: 100%;
      border-bottom: 1px solid ${this.props.theme.sideBarBorderColor};
      ::placeholder {
        color: ${this.props.theme.primaryTextColor};
      }
    `;

    const copyButton = (
      <StyledCopyBtn title="Add recipient on copy">
        <span
          className="my-cursor-pointer my-hover-underline"
          onClick={() => this.setState({ isCopyVisible: true })}
        >
          <FormattedMessage {...messages.copy} />
        </span>
      </StyledCopyBtn>
    );
    const placeholder = <FormattedMessage {...messages.subject} />;
    return (
      <header>
        <EmailOutTitle emailType="NewEmail" />

        <div style={{ margin: '0 16px' }}>
          <StyledDiv>
            <SendToInput isChangable prefix="to" emailType="NewEmail" />
            {copyButton}
          </StyledDiv>

          {copyInput}

          <div className="d-flex my-1 border-bottom">
            <StyledInput
              placeholder="Subject:"
              onChange={e =>
                this.props.updateNewEmailData({ subject: e.target.value })
              }
              type="text"
              className="my-email-header-input"
              aria-label={<FormattedMessage {...messages.subject} />}
            />
          </div>
        </div>
      </header>
    );
  }
}

EmailOutHeader.propTypes = {
  updateNewEmailData: PropTypes.func,
  theme: PropTypes.object,
};

const mapDispatchToProps = {
  updateNewEmailData,
};

export default connect(
  null,
  mapDispatchToProps,
)(withTheme(EmailOutHeader));
