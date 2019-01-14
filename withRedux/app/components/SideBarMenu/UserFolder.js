import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Types } from 'config';
import { Link } from 'react-router-dom';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { withTheme } from '@callstack/react-theme-provider';

const targetSubFolder = {
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

    return props.userFolder;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

class UserFolder extends React.Component {
  render() {
    const {
      onUserFolderClick,
      onDeleteFolderClick,
      isActive,
      userFolder,
      isOver,
      isOverCurrent,
      connectDropTarget,
      theme,
    } = this.props;

    const StyledDeleteForever = styled(DeleteForever)`
    color: ${theme.sideBarColor};
    cursor: pointer;
    font-size: 18px !important;
    top: 10px !important;
    position: absolute;
    opacity: 0.5 !important;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    :hover {
      opacity 1!important;
      visibility: visible;
    }
    a:hover + & {
      opacity 0.5;
      transition: opacity 0.3s;
      visibility: visible;
    }
  `;
    const StledLink = styled(Link)`
      width: 80px;
      opacity: 0.8 !important;
      &:hover {
        opacity: 1 !important;
      }
    `;

    return (
      connectDropTarget &&
      connectDropTarget(
        <li key={userFolder.folder} className={`${isActive}`}>
          {isOverCurrent && <div className="onDrugHoverSub" />}
          <StledLink
            to={`/${userFolder.folder}`}
            onClick={() => onUserFolderClick(userFolder.folder)}
          >
            {decodeURI(userFolder.folder)}
            &nbsp;
            {userFolder.unreaded ? `(${userFolder.unreaded})` : ''}
          </StledLink>
          <StyledDeleteForever
            className="material-icons delete-folder my-cursor-pointer"
            onClick={() => onDeleteFolderClick()}
            onTouchEnd={() => onDeleteFolderClick()}
          />
        </li>,
      )
    );
  }
}

UserFolder.propTypes = {
  onUserFolderClick: PropTypes.func,
  onDeleteFolderClick: PropTypes.func,
  isActive: PropTypes.string,
  userFolder: PropTypes.object,
  isOverCurrent: PropTypes.bool,
  connectDropTarget: PropTypes.func,
  theme: PropTypes.object,
};

export default DropTarget(Types.email, targetSubFolder, collect)(
  withTheme(UserFolder),
);
