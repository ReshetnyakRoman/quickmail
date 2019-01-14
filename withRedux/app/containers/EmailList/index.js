import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailsBatchToLoad } from 'config';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import AnimWrapper from './AnimWrapper';
import {
  makeSelectContentBoxStatus,
  makeSelectCurrentFolder,
  makeSelectContentBoxMessage,
  makeSelectIsLoading,
  makeSelectIsEmailListLoading,
} from '../App/selectors';
import {
  makeSelectCurrentUIDList,
  makeSelectCurrentEmailList,
} from '../Mailbox/selectors';
import { getLastShownUID } from '../Mailbox/utils';

import {
  updateContentBoxStatus,
  updateContentBoxMessage,
  showLoading,
  hideLoading,
} from '../App/actions';
import {
  moveEmail,
  updateNewEmailData,
  markUnreadedAtServer,
  openNewEmail,
  updateOpenEmailData,
  getEmailList,
} from '../Mailbox/actions';
import EmptyMessage from './EmptyMessageStyled';
import ContentBoxMsg from './ContentBoxMsg';
import LoadMoreBtn from './LoadMoreBtn';
import EmailListItem from '../EmailListItem';

class EmailList extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
    this.handleEmailClick = this.handleEmailClick.bind(this);
  }

  handleLoadMoreClick() {
    this.props.handleLoader(true);
    this.props.onEmailListChange(this.props.currentFolder);
  }

  componentDidMount() {
    if (
      this.props.emailList.length === 0 &&
      this.props.currentFolder !== 'Search' &&
      this.props.UIDsList.length &&
      !this.props.isEmailListLoading
    ) {
      this.props.handleLoader(true);
      this.props.onEmailListChange(this.props.currentFolder);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentFolder !== prevProps.currentFolder &&
      this.props.emailList.length < emailsBatchToLoad &&
      this.props.emailList.length < this.props.UIDsList.length &&
      this.props.UIDsList.length &&
      !this.props.isEmailListLoading
    ) {
      this.props.handleLoader(true);
      this.props.onEmailListChange(this.props.currentFolder);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLoading) return false;
    if (nextProps.isEmailListLoading) return false;
    if (
      this.props.emailList.length !== nextProps.emailList.length &&
      nextProps.UIDsList.length
    )
      return true;
    return true;
  }

  handleEmailClick(email) {
    if (email.isUnreaded) {
      this.props.handleMarkUnread(email.emailId, false);
    }
    if (this.props.currentFolder === 'Draft') {
      this.props.handleOpenNewEmail();
      this.props.handleNewEmailData(email);
    } else {
      this.props.handleContentBoxStatus('EmailIn');
      this.props.handleOpenEmailInData(email);
    }
  }

  render() {
    const {
      UIDsList,
      emailList,
      currentFolder,
      isLoading,
      contentBoxMessage,
      handleCloseMessageClick,
      handleMoveEmail,
    } = this.props;
    const emptyMessage =
      currentFolder === 'Search' ? (
        <FormattedMessage {...messages.nothingFound} />
      ) : (
        <FormattedMessage {...messages.thisFolderEmpty} />
      );
    const emails =
      emailList.length === 0 &&
      isLoading === false &&
      contentBoxMessage === '' ? (
        <EmptyMessage>{emptyMessage}</EmptyMessage>
      ) : (
        emailList.map(email => (
          <li key={email.emailId}>
            <EmailListItem
              onFolderMove={(uid, folder) => handleMoveEmail(folder, uid)}
              emailInfo={email}
              onEmailClick={() => this.handleEmailClick(email)}
              folder={currentFolder}
            />
          </li>
        ))
      );
    const message =
      contentBoxMessage !== '' ? (
        <ContentBoxMsg handleCloseClick={() => handleCloseMessageClick()}>
          {contentBoxMessage}
        </ContentBoxMsg>
      ) : null;

    let lastShownEmailUID;

    if (UIDsList.length) {
      lastShownEmailUID = getLastShownUID(emailList, UIDsList);
    } else {
      lastShownEmailUID = 0;
    }
    const lastFolderUID = UIDsList.length ? Math.min(...UIDsList) : 0;

    const loadMore =
      lastShownEmailUID > lastFolderUID ? (
        <LoadMoreBtn onClick={this.handleLoadMoreClick}>
          <FormattedMessage {...messages.loadMoreBtn} />
        </LoadMoreBtn>
      ) : null;
    const UnstyledList = styled.ul`
      padding-left: 0;
      list-style: none;
    `;
    return (
      <React.Fragment>
        {message}
        <UnstyledList>{emails}</UnstyledList>
        {loadMore}
      </React.Fragment>
    );
  }
}

EmailList.propTypes = {
  UIDsList: PropTypes.array,
  currentFolder: PropTypes.string,
  contentBoxMessage: PropTypes.string,
  emailList: PropTypes.array,
  isLoading: PropTypes.bool,
  ContentBoxStatus: PropTypes.string,
  isEmailListLoading: PropTypes.bool,
  handleCloseMessageClick: PropTypes.func,
  handleMoveEmail: PropTypes.func,
  handleOpenNewEmail: PropTypes.func,
  handleNewEmailData: PropTypes.func,
  handleMarkUnread: PropTypes.func,
  handleContentBoxStatus: PropTypes.func,
  handleOpenEmailInData: PropTypes.func,
  onEmailListChange: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  handleCloseMessageClick: () => dispatch(updateContentBoxMessage('')),
  handleMoveEmail: (toFolder, emailId) =>
    dispatch(moveEmail(toFolder, emailId)),
  handleMarkUnread: (uid, status) =>
    dispatch(markUnreadedAtServer(uid, status)),
  handleOpenNewEmail: body => dispatch(openNewEmail(body)),
  handleNewEmailData: email => dispatch(updateNewEmailData(email)),
  handleContentBoxStatus: status => dispatch(updateContentBoxStatus(status)),
  handleOpenEmailInData: data => dispatch(updateOpenEmailData(data)),
  onEmailListChange: folder => {
    dispatch(getEmailList({ folder, silent: false }));
  },
  handleLoader: status => {
    dispatch(status ? showLoading() : hideLoading());
  },
});

const mapStateToProps = createStructuredSelector({
  UIDsList: makeSelectCurrentUIDList(),
  currentFolder: makeSelectCurrentFolder(),
  contentBoxMessage: makeSelectContentBoxMessage(),
  emailList: makeSelectCurrentEmailList(),
  isLoading: makeSelectIsLoading(),
  ContentBoxStatus: makeSelectContentBoxStatus(),
  isEmailListLoading: makeSelectIsEmailListLoading(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailList);
