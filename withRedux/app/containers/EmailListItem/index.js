import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';
import Avatar from 'components/Avatar';
import MailFrom from 'components/MailFrom';
import Subject from 'components/Subject';
import Snippet from 'components/Snippet';
import AttachmentIndicator from 'components/AttachmentIndicator';
import ReceivingDate from 'components/ReceivingDate';
import EmailControls from 'containers/EmailControls';
import { DragSource } from 'react-dnd';
import { Types } from 'config';
import UnstyledLink from 'components/UnstyledLink';

const emailSource = {
  beginDrag(props, monitor, component) {
    const item = { id: props.emailInfo.emailId };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    const { folder } = dropResult;
    component.onDrop(item.id, folder);
  },
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

class EmailListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(uid, toFolder) {
    this.props.onFolderMove(uid, toFolder);
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      theme,
      emailInfo,
      onEmailClick,
      folder,
    } = this.props;

    const Wrapper = styled.div`
      display: flex;
      margin-bottom: 0.5rem;
      background-color: ${theme.backgroundColorLight};
      margin-right: 20px;
      max-width: 100%;
      flex-wrap: nowrap;
      position: relative;
      height: 100%;
      max-height: 80px;
      opacity ${isDragging ? 0 : 1};
       :hover {
        box-shadow: 0px 0px 10px ${theme.emailItemShadow}; 
      }
      & :hover button:nth-of-type(1) {
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 50ms;
      }
      & :hover button:nth-of-type(2) {
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 100ms;
      }
      & :hover button:nth-of-type(3) {
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 150ms;
      }
      @media (max-width: 768px) {
        margin-right: 10px;
      }
    `;
    const Middle = styled.div`
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      width: 100%;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      border-top: 1px solid ${theme.sideBarBorderColor};
      border-bottom: 1px solid ${theme.sideBarBorderColor};

      @media (max-width: 768px) {
        border-left: 1px solid ${theme.sideBarBorderColor};
      }
    `;
    const End = styled.div`
      display: flex;
      flex-direction: column;
      padding-right: 10px;
      border-top: 1px solid ${theme.sideBarBorderColor};
      border-right: 1px solid ${theme.sideBarBorderColor};
      border-bottom: 1px solid ${theme.sideBarBorderColor};
      justify-content: center;
    `;

    return (
      <Wrapper>
        {connectDragSource(
          <div style={{ display: 'flex', width: '100%' }}>
            <UnstyledLink to={`/${folder.toLowerCase()}/${emailInfo.emailId}`}>
              <Avatar
                user={emailInfo}
                type="square"
                onAvatarClick={e => onEmailClick(e)}
              />
            </UnstyledLink>
            <Middle onClick={e => onEmailClick(e)}>
              <UnstyledLink
                to={`/${folder.toLowerCase()}/${emailInfo.emailId}`}
              >
                <MailFrom emailInfo={emailInfo} view="short" />
                <Subject emailInfo={emailInfo} view="short" />
                <Snippet emailInfo={emailInfo} view="short" />
              </UnstyledLink>
            </Middle>
            <End onClick={e => onEmailClick(e)}>
              <UnstyledLink
                to={`/${folder.toLowerCase()}/${emailInfo.emailId}`}
              >
                <AttachmentIndicator emailInfo={emailInfo} view="short" />
                <ReceivingDate emailInfo={emailInfo} view="short" />
              </UnstyledLink>
            </End>
          </div>,
        )}
        <EmailControls view="short" email={emailInfo} />
      </Wrapper>
    );
  }
}

EmailListItem.propTypes = {
  onEmailClick: PropTypes.func,
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
  emailInfo: PropTypes.object,
  theme: PropTypes.object,
  onFolderMove: PropTypes.func,
  folder: PropTypes.string,
};

export default DragSource(Types.email, emailSource, collect)(
  withTheme(EmailListItem),
);
