import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  getSDK,
  login,
  isUserConnedtedToSocial,
  logout,
} from 'containers/LoginWithSocials/saga';

import { popUpMessageTimeOut, debounceDelay } from 'config';
import {
  LOAD_SOCIAL_SDK,
  LOGIN,
  IS_USER_LOGGED_TO_SOCIAL,
  LOGOUT,
} from 'containers/LoginWithSocials/constants';
import { SHOW_INFO_MESSAGE } from './constants';
import { hideInfoMessage, isSaveIndVisible } from './actions';

import {
  GET_EMAIL_LIST,
  SET_UPDATE_INFO_DEMON,
  MAKE_SIMPLE_API_CALL,
  CREATE_FOLDER_AT_SERVER,
  REMOVE_FOLDER_FROM_SERVER,
  MOVE_EMAIL,
  EMPTY_TRASH_FOLDER_AT_SERVER,
  DELETE_EMAIL,
  MARK_UNREADED_AT_SERVER,
  SERCH_KEYWORD_AT_SERVER,
  SAVE_DRAFT_AT_SERVER,
  SAVE_DRAFT_AT_SERVER_DEBOUNCE,
  DELETE_DRAFT,
  UPDATE_REPLY_EMAIL_DATA,
  UPDATE_NEW_EMAIL_DATA,
  SEND_EMAIL,
} from '../Mailbox/constants';

import {
  getEmailListFromServer,
  mailBoxInfoUpdateDeamon,
  makeSimpleSagaAPIcall,
  deleteFolder,
  createFolder,
  moveEmail,
  emptyTrash,
  deleteEmail,
  markUnreadedSaga,
  search,
  saveDraftAtServer,
  saveDraftAtServerDebounce,
  deleteDraft,
  sendEmail,
} from '../Mailbox/saga';

import {
  saveDraftAtServer as saveDraftAction,
  saveDraftAtServerDebounce as saveDraftDebounceAction,
} from '../Mailbox/actions';
import {
  makeSelectReplyEmailObj,
  makeSelectNewEmailObj,
} from '../Mailbox/selectors';

function* closeInfoMessage(action) {
  const timeout = action.timeout ? action.timeout : popUpMessageTimeOut;
  yield call(delay, timeout);
  yield put(hideInfoMessage());
}

function* checkForDraftSave(emailType, action) {
  const updatedEmailProps = action.emailObjProps;
  const EmailObj =
    emailType === 'ReplyEmail'
      ? yield select(makeSelectReplyEmailObj())
      : yield select(makeSelectNewEmailObj());

  if (
    updatedEmailProps.attachments
    // || updatedEmailProps.to
    // || updatedEmailProps.cc
  ) {
    yield put(saveDraftAction(EmailObj, emailType));
  } else {
    yield put(isSaveIndVisible(emailType, false));
    if (
      (EmailObj.body !== '<p><br></p>' && EmailObj.body !== '') ||
      EmailObj.subject !== ''
    ) {
      yield put(saveDraftDebounceAction(EmailObj, emailType));
    }
  }
}

export default function* handleAppUpdates() {
  yield takeEvery(GET_EMAIL_LIST, getEmailListFromServer);
  yield takeEvery(SET_UPDATE_INFO_DEMON, mailBoxInfoUpdateDeamon);
  yield takeEvery(MAKE_SIMPLE_API_CALL, makeSimpleSagaAPIcall);
  yield takeEvery(CREATE_FOLDER_AT_SERVER, createFolder);
  yield takeEvery(REMOVE_FOLDER_FROM_SERVER, deleteFolder);
  yield takeEvery(MOVE_EMAIL, moveEmail);
  yield takeEvery(EMPTY_TRASH_FOLDER_AT_SERVER, emptyTrash);
  yield takeEvery(DELETE_EMAIL, deleteEmail);
  yield takeEvery(MARK_UNREADED_AT_SERVER, markUnreadedSaga);
  yield takeEvery(SERCH_KEYWORD_AT_SERVER, search);
  yield takeEvery(SAVE_DRAFT_AT_SERVER, saveDraftAtServer);
  yield takeLatest(SAVE_DRAFT_AT_SERVER_DEBOUNCE, saveDraftAtServerDebounce);
  yield takeEvery(DELETE_DRAFT, deleteDraft);
  yield takeLatest(LOAD_SOCIAL_SDK, getSDK);
  yield takeEvery(SHOW_INFO_MESSAGE, closeInfoMessage);
  yield takeEvery(LOGIN, login);
  yield takeEvery(SEND_EMAIL, sendEmail);
  yield takeEvery(IS_USER_LOGGED_TO_SOCIAL, isUserConnedtedToSocial);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(UPDATE_REPLY_EMAIL_DATA, checkForDraftSave, 'ReplyEmail');
  yield takeEvery(UPDATE_NEW_EMAIL_DATA, checkForDraftSave, 'NewEmail');
}
