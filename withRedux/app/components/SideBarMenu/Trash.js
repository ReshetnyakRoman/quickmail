import React from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router-dom';
import { Types } from 'config';
import PropTypes from 'prop-types';

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

    return { folder: 'Trash' };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  };
}

class Trash extends React.Component {
  render() {
    const {
      isOverCurrent,
      connectDropTarget,
      folder,
      name,
      onFolderChange,
    } = this.props;
    const isActive = folder === 'Trash' ? 'isActive' : '';

    return (
      connectDropTarget &&
      connectDropTarget(
        <li className={`${isActive} trashItem`}>
          {isOverCurrent && <div className="onDrugHover" />}
          <Link to="/trash" onClick={() => onFolderChange('Trash')}>
            {name}
          </Link>
        </li>,
      )
    );
  }
}

Trash.propTypes = {
  onFolderChange: PropTypes.func,
  isOverCurrent: PropTypes.bool,
  connectDropTarget: PropTypes.func,
  folder: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DropTarget(Types.email, targetFolder, collect)(Trash);
