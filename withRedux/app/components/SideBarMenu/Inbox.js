import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTheme } from '@callstack/react-theme-provider';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import { Types, defaultFolders } from 'config';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';
import AddBox from '@material-ui/icons/AddBox';
import UserFolder from './UserFolder';

const targetFolder = {
  drop(props, monitor, component) {
    // if component dropped on itsefl do nothing
    if (!component) {
      return;
    }
    const hasDroppedOnChild = monitor.didDrop();
    // if component dropped on child, do nothing
    if (hasDroppedOnChild) {
      return;
    }

    return { folder: 'Inbox' };
  },

  hover(props, monitor, component) {
    if (monitor.isOver({ shallow: true }) && !props.isInboxOpen) {
      component.handleInboxToogle(true);
      // console.log('hover');
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

class Inbox extends React.Component {
  handleInboxToogle(status) {
    this.props.onInboxCollapseClick(status);
  }

  render() {
    const {
      isInboxOpen,
      userFolders,
      currentFolder,
      isOverCurrent,
      connectDropTarget,
      inboxUnreaded,
      onDeleteFolderClick,
      onFolderChange,
      onAddFolderClick,
      onInboxCollapseClick,
      name,
      theme,
    } = this.props;

    const isActive =
      defaultFolders.indexOf(currentFolder) !== -1 ? '' : 'isActive';

    const StyledArrowDropDown = styled(ArrowDropDown)`
      color: ${theme.sideBarColor};
      position: absolute;
      margin-left: 8px;
      top: 8px;
      cursor: pointer;
    `;
    const StyledArrowRight = styled(ArrowRight)`
      color: ${theme.sideBarColor};
      margin-left: 8px;
      position: absolute;
      top: 8px;
      cursor: pointer;
    `;

    const StyledAddBox = styled(AddBox)`
      font-size: 18px !important;
      position: relative;
      left: -5px;
    `;
    const StyledA = styled.a`
      opacity: 0.8 !important;
      color: ${theme.infoColor} !important;
      cursor: pointer;
      font-size: 12px;
      ${StyledList}:hover {
        opacity: 1 !important;
      }
    `;
    const StyledList = styled.ul`
      li.isActive::before {
        transform: translate(4px, 0rem);
      }
      li::before {
        content: '';
        height: 100%;
        position: absolute;
        left: -16px;
        top: 0;
        background-color: ${theme.successColor};
        width: 9px;
        transform: translateX(-3px);
        z-index: -1;
      }
      li:hover::before {
        transform: translateX(4px);
      }
      li:hover {
        transform: translateX(4px);
      }
      li.isActive:hover {
        transform: translateX(0px);
      }
      display: ${isInboxOpen ? 'block' : 'none'};
      padding: 0;
    `;

    const InboxFolder = (
      <Link to="/inbox" onClick={() => onFolderChange('Inbox')}>
        {name} {inboxUnreaded ? `(${inboxUnreaded})` : ''}
      </Link>
    );

    const toogleCollapseIcon = (
      <span
        onClick={() => onInboxCollapseClick(!isInboxOpen)}
        onTouchEnd={() => onInboxCollapseClick(!isInboxOpen)}
      >
        {isInboxOpen ? (
          <StyledArrowDropDown className="toogle" />
        ) : (
          <StyledArrowRight className="toogle" />
        )}
      </span>
    );

    const folders = userFolders.map(userFolder => {
      const isActiveUsrFldr =
        currentFolder === userFolder.folder ? 'isActive' : '';

      return (
        <UserFolder
          key={userFolder.folder}
          userFolder={userFolder}
          isActive={isActiveUsrFldr}
          unreaded={userFolder.unreaded}
          onDeleteFolderClick={() => onDeleteFolderClick(userFolder.folder)}
          onUserFolderClick={folder => onFolderChange(folder)}
        />
      );
    });

    const addNewFolder = (
      <li key="newfolder">
        <StyledA
          onClick={folder => onAddFolderClick(folder)}
          onTouchEnd={folder => onAddFolderClick(folder)}
        >
          <StyledAddBox />
          &nbsp;new folder
        </StyledA>
      </li>
    );

    const inboxSubFolders = (
      <StyledList className=" inner-list">
        {addNewFolder}
        {folders}
      </StyledList>
    );

    return (
      connectDropTarget &&
      connectDropTarget(
        <li className={`inboxItem ${isActive}`}>
          {isOverCurrent && <div className="onDrugHover" />}
          {InboxFolder}
          {toogleCollapseIcon}
          {inboxSubFolders}
        </li>,
      )
    );
  }
}
// {inboxSubFolders}
Inbox.propTypes = {
  isInboxOpen: PropTypes.bool,
  userFolders: PropTypes.array,
  currentFolder: PropTypes.string,
  isOverCurrent: PropTypes.bool,
  connectDropTarget: PropTypes.func,
  inboxUnreaded: PropTypes.number,
  onDeleteFolderClick: PropTypes.func,
  onFolderChange: PropTypes.func,
  onAddFolderClick: PropTypes.func,
  onInboxCollapseClick: PropTypes.func,
  name: PropTypes.object,
  theme: PropTypes.object,
};

export default DropTarget(Types.email, targetFolder, collect)(withTheme(Inbox));
