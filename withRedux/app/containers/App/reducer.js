import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { RESET_TO_SYSTEM_INITIAL_STATE } from 'containers/LoginWithSocials/constants';
import {
  SHOW_INFO_MESSAGE,
  HIDE_INFO_MESSAGE,
  SHOW_LOADING,
  HIDE_LOADING,
  UPDATE_LOADED_COMPLETE,
  CHANGE_CURRENT_FOLDER,
  IS_SAVE_INDICATOR_VISIBLE,
  HANDLE_PROGRESS_BAR,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_ADD_FOLDER_MODAL,
  HIDE_ADD_FOLDER_MODAL,
  CHANGE_DEMON_COUNTER,
  UPDATE_SCREEN_INFO,
  UPDATE_IS_SEARCH_VISIBLE,
  UPDATE_CONTENTBOX_STATUS,
  UPDATE_CONTENTBOX_MESSAGE,
  UPDATE_GETEMAIL_STATUS,
  UPDATE_EMAIL_LIST_LOADING_STATUS,
} from './constants';
import { emails, emailList } from 'containers/Mailbox/reducer';

const inititalState = fromJS({
  showInfoMessage: {
    messageID: 'default',
    messageType: 'info',
    isVisible: false,
    msgParametr: '',
  },
  updateDemonCounter: 0,
  screen: { width: 0, height: 0 },
  screenType: 'desktop',
  isLoading: false,
  isAppLoaded: false,
  currentFolder: 'Inbox',
  isSavedIndVisible: { NewEmail: false, ReplyEmail: false },
  showProgressBar: false,
  confirmationModal: {
    headerID: 'deleteFolderConfirmationHeader',
    bodyID: 'deleteFolderConfirmationBody',
    agreeButtonTextID: 'deleteFolderConfirmationAgree',
    disagreeButtonTextID: 'deleteFolderConfirmationDisAgree',
    isVisible: false,
    folder: '',
  },
  addFolderModal: {
    isVisible: false,
  },
  isSearchVisible: false,
  contentBoxStatus: 'EmailList',
  contentBoxMessage: '',
  getEmailStatus: 'ready',
  isEmailListLoading: false,
});

function servicesReducer(state = inititalState, action) {
  switch (action.type) {
    case UPDATE_EMAIL_LIST_LOADING_STATUS:
      return state.set('isEmailListLoading', action.status);
    case UPDATE_GETEMAIL_STATUS:
      return state.set('getEmailStatus', action.status);
    case UPDATE_CONTENTBOX_STATUS:
      return state.set('contentBoxStatus', action.status);
    case UPDATE_CONTENTBOX_MESSAGE:
      return state.set('contentBoxMessage', action.message);
    case UPDATE_IS_SEARCH_VISIBLE:
      return state.set('isSearchVisible', action.status);
    case UPDATE_SCREEN_INFO:
      return state
        .set('screen', fromJS(action.screen))
        .set('screenType', action.screenType);
    case CHANGE_DEMON_COUNTER:
      return state.set(
        'updateDemonCounter',
        state.get('updateDemonCounter') + action.increment,
      );
    case SHOW_MODAL:
      return state.withMutations(s => {
        for (const [prop, value] of Object.entries(action.props)) {
          s.setIn(['confirmationModal', prop], value);
        }
      });
    case HIDE_MODAL:
      return state.withMutations(s => {
        s.setIn(['confirmationModal', 'isVisible'], false);
      });
    case SHOW_ADD_FOLDER_MODAL:
      return state.withMutations(s => {
        s.setIn(['addFolderModal', 'isVisible'], true);
      });
    case HIDE_ADD_FOLDER_MODAL:
      return state.withMutations(s => {
        s.setIn(['addFolderModal', 'isVisible'], false);
      });
    case SHOW_LOADING:
      return state.set('isLoading', true);
    case HIDE_LOADING:
      return state.set('isLoading', false);
    case UPDATE_LOADED_COMPLETE:
      return state.set('isAppLoaded', action.status);
    case SHOW_INFO_MESSAGE:
      return state.withMutations(s => {
        s.setIn(['showInfoMessage', 'messageID'], action.messageID)
          .setIn(['showInfoMessage', 'messageType'], action.messageType)
          .setIn(['showInfoMessage', 'isVisible'], true)
          .setIn(
            ['showInfoMessage', 'msgParametr'],
            action.msgParametr ? action.msgParametr : '',
          );
      });
    case HIDE_INFO_MESSAGE:
      return state.withMutations(s => {
        s.setIn(['showInfoMessage', 'isVisible'], false);
      });
    case CHANGE_CURRENT_FOLDER:
      return state.withMutations(s => s.set('currentFolder', action.folder));
    case IS_SAVE_INDICATOR_VISIBLE:
      return state.withMutations(s =>
        s.setIn(['isSavedIndVisible', action.msgType], action.status),
      );
    case HANDLE_PROGRESS_BAR:
      return state.withMutations(s => s.set('showProgressBar', action.status));
    case RESET_TO_SYSTEM_INITIAL_STATE:
      return inititalState
        .set('isAppLoaded', true)
        .set('updateDemonCounter', state.get('updateDemonCounter'));
    default:
      return state;
  }
}

// export default servicesReducer;

export default combineReducers({
  Services: servicesReducer,
  EmailList: emailList,
  Email: emails,
});
