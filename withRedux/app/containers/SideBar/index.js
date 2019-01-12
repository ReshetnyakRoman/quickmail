import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { domainName } from 'config';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import MobileMenuIcon from 'components/MobileMenuIcon';
import AccountInfo from 'components/AccountInfo';
import Avatar from 'components/Avatar';
import SideBarMenu from 'components/SideBarMenu';
import { FormattedMessage } from 'react-intl';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { changeTheme } from 'containers/ThemeProvider/actions';
import { makeSelectIsThemeDefault } from 'containers/ThemeProvider/selectors';
import reducer from './reducer';
import messages from './messages';
import {
  makeSelectScreenType,
  makeSelectCurrentFolder,
} from '../App/selectors';
import {
  makeSelectUserFolders,
  makeSelectUnreaded,
} from '../Mailbox/selectors';
import { makeSelectUserInfo } from '../LoginWithSocials/selectors';
import { logoutFromSocial } from '../LoginWithSocials/actions';
import { makeSelectIsSidebarOpen } from './selectors';
import StyledBg from './StyledBg';
import { toogleSidebarOpen } from './actions';
import NewEmailBtn from './NewEmailBtn';
import AccountBlock from './AccountBlock';
import {
  openNewEmail,
  updateNewEmailData,
  updateOpenEmailData,
  closeReplyEmail,
} from '../Mailbox/actions';
import {
  changeCurrentFolder,
  showConfirmationModal,
  showAddFolderModal,
  updateContentBoxStatus,
} from '../App/actions';
import SwitchBlock from './SwitchBlock';

function SideBar(props) {
  const {
    screenType,
    isOpen,
    toogleOpen,
    userInfo,
    logout,
    onNewEmailClick,
    currentFolder,
    handleCurrentFolder,
    userFolders,
    inboxUnreaded,
    showConfrimation,
    handleAddFolderClick,
    toogleTheme,
    toogleLang,
    language,
    isThemeDefault,
  } = props;
  const picURL = { avatar: userInfo.pic };
  return (
    <div>
      <MobileMenuIcon isOpen={isOpen} onIconClick={() => toogleOpen()} />
      <StyledBg isOpen={isOpen} screnType={screenType}>
        <AccountBlock>
          <Avatar user={picURL} type="circle" />
          <AccountInfo
            user={userInfo}
            logout={() => logout()}
            exitText={<FormattedMessage {...messages.Exit} />}
          />
        </AccountBlock>
        <NewEmailBtn
          onNewEmailClick={() => onNewEmailClick(userInfo.name, userInfo.email)}
        >
          <FormattedMessage {...messages.NewEmail} />
        </NewEmailBtn>
        <SideBarMenu
          currentFolder={currentFolder}
          userFolders={userFolders}
          inboxUnreaded={inboxUnreaded}
          handleCurrentFolder={folder => handleCurrentFolder(folder)}
          handleDeleteFolderClick={folder => showConfrimation(folder)}
          handleAddFolderClick={folder => handleAddFolderClick(folder)}
        />
        <SwitchBlock
          isThemeDefault={isThemeDefault}
          toogleTheme={toogleTheme}
          language={language}
          toogleLang={lang => toogleLang(lang)}
        />
      </StyledBg>
    </div>
  );
}

SideBar.propTypes = {
  screenType: PropTypes.string,
  toogleOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  userInfo: PropTypes.object,
  logout: PropTypes.func,
  currentFolder: PropTypes.string,
  userFolders: PropTypes.array,
  showConfrimation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  screenType: makeSelectScreenType(),
  isOpen: makeSelectIsSidebarOpen(),
  userInfo: makeSelectUserInfo(),
  currentFolder: makeSelectCurrentFolder(),
  userFolders: makeSelectUserFolders(),
  inboxUnreaded: makeSelectUnreaded('Inbox'),
  language: makeSelectLocale(),
  isThemeDefault: makeSelectIsThemeDefault(),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toogleOpen: () => dispatch(toogleSidebarOpen()),
  toogleLang: lang => dispatch(changeLocale(lang)),
  toogleTheme: () => dispatch(changeTheme()),
  handleCurrentFolder: folder => {
    dispatch(updateContentBoxStatus('EmailList'));
    dispatch(updateOpenEmailData(''));
    dispatch(closeReplyEmail());
    dispatch(changeCurrentFolder(folder));
    if (ownProps.screenType !== 'desktop') {
      dispatch(toogleSidebarOpen());
    }
  },
  showConfrimation: folder =>
    dispatch(showConfirmationModal({ isVisible: true, folder })),
  handleAddFolderClick: modalProps => dispatch(showAddFolderModal(modalProps)),
  logout: () => dispatch(logoutFromSocial()),
  onNewEmailClick: (name, email) => {
    dispatch(openNewEmail());
    dispatch(
      updateNewEmailData({
        MessageID: `<new${Date.now()}${domainName}>`,
        from: { name, email },
      }),
    );
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'SideBar', reducer });

export default compose(
  withReducer,
  withConnect,
)(SideBar);
