import { fromJS, List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { RESET_TO_SYSTEM_INITIAL_STATE } from 'containers/LoginWithSocials/constants';
import {
  UPDATE_FOLDER_INFO,
  ADD_FOLDER_TO_STORE,
  DELETE_FOLDER_FROM_STORE,
  ADD_EMAILS_TO_FOLDER,
  DELETE_EMAIL_FROM_FOLDER,
  EMPTY_TRASH_FOLDER,
  MARK_UNREADED,
  OPEN_NEW_EMAIL,
  CLOSE_NEW_EMAIL,
  REPLY_EMAIL,
  CLOSE_REPLY_EMAIL,
  UPDATE_NEW_EMAIL_DATA,
  UPDATE_REPLY_EMAIL_DATA,
  UPDATE_OPEN_EMAILIN_DATA,
} from 'containers/Mailbox/constants';
import { getMessageIDList, updateEmailObj } from './utils';

const initialFolders = fromJS({
  Inbox: { emails: [], default: true, unreaded: 0, UIDs: [] },
  Draft: { emails: [], default: true, unreaded: 0, UIDs: [] },
  Sent: { emails: [], default: true, unreaded: 0, UIDs: [] },
  Trash: { emails: [], default: true, unreaded: 0, UIDs: [] },
  Search: { emails: [], default: true, unreaded: 0, UIDs: [] },
});

function emailList(state = initialFolders, action) {
  switch (action.type) {
    case ADD_FOLDER_TO_STORE:
    case UPDATE_FOLDER_INFO:
      const props = action.props ? action.props : {};
      return state.withMutations(s => {
        for (const [prop, value] of Object.entries(props)) {
          s.setIn([action.folder, prop], fromJS(value));
        }
      });
    case DELETE_FOLDER_FROM_STORE:
      return state.delete(action.folder);
    case ADD_EMAILS_TO_FOLDER:
      return state.withMutations(s => {
        const loadedIDs = getMessageIDList(
          s.getIn([action.folder, 'emails']).toJS(),
        );

        const allUIDs = s.getIn([action.folder, 'UIDs']);
        for (const email of action.emails) {
          if (loadedIDs.indexOf(email.MessageID) === -1) {
            s.updateIn([action.folder, 'emails'], emails =>
              emails.push(fromJS(email)),
            );
            if (allUIDs.indexOf(email.emailId) === -1) {
              s.updateIn([action.folder, 'UIDs'], UIDs =>
                UIDs.push(email.emailId),
              );
            }
          }
        }
      });
    case DELETE_EMAIL_FROM_FOLDER:
      return state.withMutations(s => {
        s.updateIn([action.folder, 'emails'], emails =>
          emails.filter(email => email.get('emailId') !== action.emailId),
        ).updateIn([action.folder, 'UIDs'], UIDs =>
          UIDs.filter(uid => uid !== action.emailId),
        );
      });
    case EMPTY_TRASH_FOLDER:
      return state.withMutations(s => {
        s.setIn(['Trash', 'emails'], List([]))
          .setIn(['Trash', 'unreaded'], 0)
          .setIn(['Trash', 'UIDs'], List([]));
      });
    case MARK_UNREADED:
      const emails = state.getIn([action.folder, 'emails']).toJS();
      const index = emails.map(email => email.emailId).indexOf(action.emailId);
      let unreaded = state.getIn([action.folder, 'unreaded']);
      unreaded += action.isUnreaded ? 1 : -1;
      return state.withMutations(s => {
        s.setIn(
          [action.folder, 'emails', index, 'isUnreaded'],
          action.isUnreaded,
        ).setIn([action.folder, 'unreaded'], unreaded > -1 ? unreaded : 0);
      });
    case RESET_TO_SYSTEM_INITIAL_STATE:
      return initialFolders;
    default:
      return state;
  }
}

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

const initialState = fromJS({
  replyEmailStatus: 'closed',
  replyEmailObj: defaultEmailState,
  newEmailStatus: 'closed',
  newEmailObj: defaultEmailState,
  openEmailInData: '',
});

function emails(state = initialState, action) {
  switch (action.type) {
    case UPDATE_OPEN_EMAILIN_DATA:
      return state.set('openEmailInData', fromJS(action.data));
    case OPEN_NEW_EMAIL:
      return state.set('newEmailStatus', 'open');
    case CLOSE_NEW_EMAIL:
      return state
        .set('newEmailStatus', 'closed')
        .set('newEmailObj', defaultEmailState);
    case REPLY_EMAIL:
      return state.set('replyEmailStatus', action.replyType);
    case CLOSE_REPLY_EMAIL:
      return state
        .set('replyEmailStatus', 'closed')
        .set('replyEmailObj', defaultEmailState);
    case UPDATE_NEW_EMAIL_DATA:
      return state.withMutations(s => {
        const updatedProps = action.emailObjProps ? action.emailObjProps : {};
        const currentEmail = s.get('newEmailObj').toJS();
        const updatedEmail = updateEmailObj(updatedProps, currentEmail);
        for (const [prop, value] of Object.entries(updatedEmail)) {
          s.setIn(['newEmailObj', prop], fromJS(value));
        }
      });
    case UPDATE_REPLY_EMAIL_DATA:
      return state.withMutations(s => {
        const updatedProps = action.emailObjProps ? action.emailObjProps : {};
        const currentEmail = s.get('replyEmailObj').toJS();
        const updatedEmail = updateEmailObj(updatedProps, currentEmail);
        for (const [prop, value] of Object.entries(updatedEmail)) {
          s.setIn(['replyEmailObj', prop], fromJS(value));
        }
      });
    case RESET_TO_SYSTEM_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
}

export default combineReducers({
  EmailList: emailList,
  Email: emails,
});

export { emails, emailList };
