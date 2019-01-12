import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormatBytes from 'utils/formatBytes';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Attachment from '@material-ui/icons/Attachment';
import { withTheme } from '@callstack/react-theme-provider';
import { FormattedMessage } from 'react-intl';
import { makeSelectOpenEmailData } from 'containers/Mailbox/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import UnslyledLink from '../UnstyledLink';

function Attachments(props) {
  const { emailInfo, theme } = props;
  const AttachnetnCard = styled.div`
    position: relative;
    display: inline-block;
    margin: 16px;
    border: 1px solid ${theme.sideBarBorderColor};
    :hover {
      border: 1px solid ${theme.infoColor};
    }
    @media (max-width: 768px) {
      margin: 6px;
    }
  `;
  const CardContent = styled.div`
    text-align: center;
    padding: 16px 36px;
    svg {
      color: ${theme.infoColor} !important;
      height: 56px !important;
      width: 56px !important;
    }
  `;
  const CardFooter = styled.div`
    color: ${theme.primaryTextColor};
    border-top: 1px solid ${theme.sideBarBorderColor};
    background-color: ${theme.badegBG};
    font-weight: bold;
    text-align: center;
    font-size: 0.7rem;
    max-height: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 130px;
    padding: 0.5rem 0.3rem;
  `;
  const Overlay = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    background-color: ${theme.infoColor};
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: 0.2s ease;
    text-align: center;
    color: #fff;
    p {
      font-size: 14px;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 4px 12px;
      margin-bottom: 4px;
      font-family: inherit;
    }
    svg {
      color: #fff !important;
      height: 50px !important;
      width: 50px !important;
    }
    ${AttachnetnCard}:hover & {
      bottom: 0;
      height: 100%;
    }
  `;
  const StyledIcon = styled(CloudDownload)`
    height: 30px !important;
    width: 30px !important;
  `;
  if (emailInfo.attachments) {
    const attachments = emailInfo.attachments.map(file => (
      <AttachnetnCard key={file.name}>
        <CardContent>
          <Attachment />
        </CardContent>
        <CardFooter>{file.name}</CardFooter>

        <Overlay>
          <a
            href={file.url}
            style={{ textDecoration: 'none', color: 'white' }}
            target="_blank"
            download
          >
            <p>{file.name}</p>
            <CloudDownload />
            <p style={{ fontSize: '10px' }}>
              <FormattedMessage {...messages.download} /> (
              {FormatBytes(file.size)})
            </p>
          </a>
        </Overlay>
      </AttachnetnCard>
    ));
    return (
      <div>
        <hr style={{ borderStyle: 'dotted', width: '100%' }} />
        <div style={{ display: 'flex' }}>{attachments}</div>
      </div>
    );
  }

  return <div />;
}

Attachments.propTypes = {
  emailInfo: PropTypes.object,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  emailInfo: makeSelectOpenEmailData(),
});

export default connect(
  mapStateToProps,
  null,
)(withTheme(Attachments));
