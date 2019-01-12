import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withTheme } from '@callstack/react-theme-provider';
import EmptyTrashButton from './EmptyTrashButton';
import messages from './messages';
import {
  makeSelectScreenType,
  makeSelectCurrentFolder,
  makeSelectIsSearchVisible,
} from '../App/selectors';
import {
  searchKeywordAtServer,
  emptyTrashFolderAtServer,
} from '../Mailbox/actions';
import SearchBar from './SearchBar';
import StyledTopBg from './StyledTopBg';
import CurrentFolder from './CurrentFolder';
import { updateIsSearchVisible } from '../App/actions';

function TopBar(props) {
  const {
    theme,
    onSearch,
    screnType,
    folder,
    onEmptyTrash,
    isSearchVisible,
    toogleSearchVisible,
  } = props;
  const EmptyTrash =
    folder !== 'Trash' ? null : (
      <EmptyTrashButton
        theme={theme}
        folder={folder}
        onEmptyTrash={() => onEmptyTrash()}
        tooltip={<FormattedMessage {...messages.EmptyTrash} />}
      />
    );

  return (
    <StyledTopBg theme={theme}>
      <CurrentFolder
        screnType={screnType}
        folder={folder}
        isVisible={!isSearchVisible}
      />
      <SearchBar
        onSearch={keyword => onSearch(keyword)}
        toogleSearchVisible={toogleSearchVisible}
        theme={theme}
      />
      {EmptyTrash}
    </StyledTopBg>
  );
}

TopBar.propTypes = {
  onSearch: PropTypes.func,
  onEmptyTrash: PropTypes.func,
  screnType: PropTypes.string,
  folder: PropTypes.string,
  theme: PropTypes.object,
  isSearchVisible: PropTypes.bool,
  toogleSearchVisible: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onSearch: keyword => dispatch(searchKeywordAtServer(keyword)),
  onEmptyTrash: () => dispatch(emptyTrashFolderAtServer()),
  toogleSearchVisible: status => dispatch(updateIsSearchVisible(status)),
});

const mapStateToProps = createStructuredSelector({
  screnType: makeSelectScreenType(),
  folder: makeSelectCurrentFolder(),
  isSearchVisible: makeSelectIsSearchVisible(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(TopBar));
