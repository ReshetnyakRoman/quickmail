/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { domainName } from 'config';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { withTheme } from '@callstack/react-theme-provider';
import { createStructuredSelector } from 'reselect';
import ConfirmationAlert from '../ConfirmationAlert/Loadable';
import AddFolderModal from '../AddFolderModal/Loadable';
import NewEmailBtn from '../SideBar/NewEmailBtn';
import {
  makeSelectDemonCounter,
  makeSelectContentBoxStatus,
} from '../App/selectors';
import {
  makeSelectIsLoggedIn,
  makeSelectUserInfo,
} from '../LoginWithSocials/selectors';
import reducer from './reducer';
import {
  setUpdateInfoDemon,
  openNewEmail,
  updateNewEmailData,
} from './actions';
import SideBar from '../SideBar/Loadable';
import TopBar from '../TopBar/Loadable';
import EmailList from '../EmailList/Loadable';
import EmailIn from '../EmailIn/Loadable';
import EmailOut from '../EmailOut/Loadable';
import { selectFullEmailList } from './selectors';

class Mailbox extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn && this.props.demonCounter === 0)
      this.props.startUpdateDeamon();
  }

  render() {
    const { contentBoxStatus, theme, userInfo, onNewEmailClick } = this.props;

    const StyledDiv = styled.div`
      padding-top: 90px;
      padding-left: 170px;
      background-color: ${theme.backgroundColor};
      min-height: 100vh;
      height: 100%;
      padding-bottom: 40px;
      @media (max-width: 768px) {
        padding-left: 10px;
      }
    `;

    const ContentBox =
      contentBoxStatus === 'EmailList' ? <EmailList /> : <EmailIn />;
    return (
      <React.Fragment>
        <TopBar />
        <SideBar />
        <EmailOut />

        <StyledDiv>
          {ContentBox}
          <NewEmailBtn
            type="mobile"
            onNewEmailClick={() =>
              onNewEmailClick(userInfo.name, userInfo.email)
            }
          />
        </StyledDiv>
        <ConfirmationAlert />
        <AddFolderModal
          addFolderHeaderID="addFolderHeaderID"
          addFolderFormTextID="addFolderFormTextID"
          addFolderAgreeID="addFolderAgreeID"
          addFolderDisagreeID="addFolderDisagreeID"
        />
      </React.Fragment>
    );
  }
}

Mailbox.propTypes = {
  startUpdateDeamon: PropTypes.func,
  demonCounter: PropTypes.number,
  isLoggedIn: PropTypes.bool,
  contentBoxStatus: PropTypes.string,
  theme: PropTypes.object,
  userInfo: PropTypes.object,
  onNewEmailClick: PropTypes.func,
  FullEmailList: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onNewEmailClick: (name, email) => {
    dispatch(openNewEmail());
    dispatch(
      updateNewEmailData({
        MessageID: `<new${Date.now()}${domainName}>`,
        from: { name, email },
      }),
    );
  },
  startUpdateDeamon: () => dispatch(setUpdateInfoDemon(true)),
});

const mapStateToProps = createStructuredSelector({
  demonCounter: makeSelectDemonCounter(),
  isLoggedIn: makeSelectIsLoggedIn(),
  contentBoxStatus: makeSelectContentBoxStatus(),
  userInfo: makeSelectUserInfo(),
  FullEmailList: selectFullEmailList(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(Mailbox));
