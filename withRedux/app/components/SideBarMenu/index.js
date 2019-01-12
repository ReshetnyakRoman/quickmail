import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper';
import MenuItem from './MenuItem';
import Trash from './Trash';
import Inbox from './Inbox';
import messages from './messages';

class SideBarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isInboxOpen: true };
  }

  render() {
    const {
      handleDeleteFolderClick,
      handleCurrentFolder,
      handleAddFolderClick,
      currentFolder,
      userFolders,
      inboxUnreaded,
    } = this.props;
    const { isInboxOpen } = this.state;
    return (
      <Wrapper>
        <Inbox
          name={<FormattedMessage {...messages.Inbox} />}
          isInboxOpen={isInboxOpen}
          userFolders={userFolders}
          currentFolder={currentFolder}
          inboxUnreaded={inboxUnreaded}
          onDeleteFolderClick={handleDeleteFolderClick}
          onFolderChange={handleCurrentFolder}
          onAddFolderClick={handleAddFolderClick}
          onInboxCollapseClick={() =>
            this.setState({ isInboxOpen: !isInboxOpen })
          }
        />
        <MenuItem
          onFolderChange={handleCurrentFolder}
          name={<FormattedMessage {...messages.Draft} />}
          folder={currentFolder}
          type="Draft"
        />
        <MenuItem
          onFolderChange={handleCurrentFolder}
          name={<FormattedMessage {...messages.Sent} />}
          folder={currentFolder}
          type="Sent"
        />
        <Trash
          folder={currentFolder}
          onFolderChange={handleCurrentFolder}
          name={<FormattedMessage {...messages.Trash} />}
        />
      </Wrapper>
    );
  }
}

SideBarMenu.propTypes = {
  handleDeleteFolderClick: PropTypes.func,
  handleCurrentFolder: PropTypes.func,
  handleAddFolderClick: PropTypes.func,
  inboxUnreaded: PropTypes.number,
  currentFolder: PropTypes.string,
  userFolders: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SideBarMenu;
