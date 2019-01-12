import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function MenuItem(props) {
  const { onFolderChange, name, type, folder } = props;
  const isActive = folder === type ? 'isActive' : '';
  const className = type === 'Draft' ? 'draftItem' : 'sentItem';
  return (
    <li className={`${className} ${isActive}`}>
      <Link to={type.toLowerCase()} onClick={() => onFolderChange(type)}>
        {name}
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  onFolderChange: PropTypes.func,
  name: PropTypes.object,
  type: PropTypes.string,
  folder: PropTypes.string,
};

export default MenuItem;
