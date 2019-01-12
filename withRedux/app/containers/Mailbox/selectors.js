import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { getUIDlist, getUserFolders } from './utils';
import { makeSelectCurrentFolder } from '../App/selectors';

const defaultEmailState = fromJS({
  id: '',
  MessageID: '',
  from: '',
  to: [],
  cc: [],
  subject: '',
  body: '',
  attachments: [],
});

const selectEmailList = state => state.getIn(['App', 'EmailList']);
const selectEmail = state => state.getIn(['App', 'Email']);

const makeSelectOpenEmailData = () =>
  createSelector(selectEmail, data => {
    const email = data.get('openEmailInData', defaultEmailState);
    if (email) return email.toJS();
    return '';
  });
const selectFullEmailList = () =>
  createSelector(selectEmailList, data => data.toJS());

const makeSelectAllUIDs = folder =>
  createSelector(selectEmailList, emailList =>
    emailList.getIn([folder, 'UIDs']).toJS(),
  );
const makeSelectAllFolders = () =>
  createSelector(selectEmailList, emailList => emailList.keySeq().toJS());

const makeSelectEmail = (folder, uid) =>
  createSelector(selectEmailList, emailList =>
    emailList
      .getIn([folder, 'emails'])
      .filter(email => email.get('emailId') === uid)
      .get(0)
      .toJS(),
  );

const makeSelectFolderInfo = folder =>
  createSelector(selectEmailList, emailList => emailList.get(folder).toJS());

const makeSelectCurrentUIDList = () =>
  createSelector(
    selectEmailList,
    makeSelectCurrentFolder(),
    makeSelectAllFolders(),
    (emailList, currentFldr, folders) => {
      const folder = folders.indexOf(currentFldr) > 0 ? currentFldr : 'Inbox';
      return emailList.getIn([folder, 'UIDs']).toJS();
    },
  );

const makeSelectCurrentEmailList = () =>
  createSelector(
    selectEmailList,
    makeSelectCurrentFolder(),
    makeSelectAllFolders(),
    (emailList, currentFldr, folders) => {
      const folder = folders.indexOf(currentFldr) > 0 ? currentFldr : 'Inbox';

      return emailList
        .getIn([folder, 'emails'])
        .toJS()
        .sort((a, b) => new Date(b.receivingDate) - new Date(a.receivingDate));
    },
  );

const makeSelectUserFolders = () =>
  createSelector(selectEmailList, emailList =>
    getUserFolders(emailList.toJS()),
  );

const makeSelectUnreaded = folder =>
  createSelector(selectEmailList, emailList =>
    emailList.getIn([folder, 'unreaded']),
  );

const makeSelectLoadedEmailsUIDs = folder =>
  createSelector(selectEmailList, emailList =>
    getUIDlist(emailList.getIn([folder, 'emails']).toJS()),
  );

const makeSelectNewEmailStatus = () =>
  createSelector(selectEmail, Email => Email.get('newEmailStatus'));

const makeSelectReplyEmailStatus = () =>
  createSelector(selectEmail, Email => Email.get('replyEmailStatus'));

const makeSelectNewEmailObj = () =>
  createSelector(selectEmail, Email => Email.get('newEmailObj').toJS());

const makeSelectReplyEmailObj = () =>
  createSelector(selectEmail, Email => Email.get('replyEmailObj').toJS());

const makeSelectEmailList = () =>
  createSelector(selectEmailList, emailList => emailList.toJS());

export {
  makeSelectAllUIDs,
  makeSelectLoadedEmailsUIDs,
  makeSelectAllFolders,
  makeSelectFolderInfo,
  makeSelectEmail,
  makeSelectUserFolders,
  makeSelectNewEmailStatus,
  makeSelectReplyEmailStatus,
  makeSelectNewEmailObj,
  makeSelectReplyEmailObj,
  makeSelectEmailList,
  makeSelectUnreaded,
  makeSelectOpenEmailData,
  makeSelectCurrentUIDList,
  makeSelectCurrentEmailList,
  selectFullEmailList,
};
