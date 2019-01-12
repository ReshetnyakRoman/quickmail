import {
  call,
  // takeEvery,
  // takeLatest,
  select,
  put,
  cancelled,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { makeMailServeAPIcall, authorizedHeader } from 'utils/request';

import {
  makeSelectLoadedEmailsUIDs,
  makeSelectAllUIDs,
  makeSelectAllFolders,
  makeSelectFolderInfo,
  makeSelectEmail,
  makeSelectEmailList,
  makeSelectReplyEmailObj,
  makeSelectNewEmailObj,
} from 'containers/Mailbox/selectors';
import serverURL, {
  mailboxUpdateInterval,
  emailsBatchToLoad,
  debounceDelay,
} from 'config';
import {
  makeSelectUserID,
  makeSelectAccessToken,
} from 'containers/LoginWithSocials/selectors';

import {
  makeSelectDemonCounter,
  makeSelectCurrentFolder,
} from 'containers/App/selectors';
// import { LOGOUT } from 'containers/LoginWithSocials/constants';
/*import {
  GET_EMAIL_LIST,
  SET_UPDATE_INFO_DEMON,
  CREATE_FOLDER_AT_SERVER,
  MAKE_SIMPLE_API_CALL,
  REMOVE_FOLDER_FROM_SERVER,
  MOVE_EMAIL,
  EMPTY_TRASH_FOLDER_AT_SERVER,
  DELETE_EMAIL,
  MARK_UNREADED_AT_SERVER,
  SERCH_KEYWORD_AT_SERVER,
  DELETE_DRAFT,
  SAVE_DRAFT_AT_SERVER,
} from './constants';*/

import {
  deleteFolderFromStore,
  addFolderToStore,
  getEmailList,
  makeSimpleAPIcall,
  addEmailsToFolder,
  deleteEmailFromFolder,
  updateFolderInfo,
  emptyTrashFolder,
  markUnreaded,
  closeReplyEmail,
  closeNewEmail,
  // deleteDraft as deleteDraftAct,
} from './actions';
import {
  showInfoMessage,
  showLoading,
  hideLoading,
  changeCurrentFolder,
  isSaveIndVisible,
  hideConfirmationModal,
  changeDemonCounter,
  updateIsSearchVisible,
  updateEmailListLoadingStatus,
  showProgressBar,
} from '../App/actions';
import {
  msgProps,
  saccessMessage,
  warningMessage,
  errorMessage,
} from '../App/utils';
import {
  findDifference,
  firstShownUID,
  lastShownUID,
  b64EncodeUnicode,
  createMsg,
  isAllRecipientsValid,
} from './utils';

function* mailBoxInfoUpdateDeamon() {
  try {
    const demonCounter = yield select(makeSelectDemonCounter());
    if (demonCounter === 0) {
      yield put(changeDemonCounter(1));
      while (true) {
        yield call(delay, mailboxUpdateInterval);

        const id = yield select(makeSelectUserID());
        const accessToken = yield select(makeSelectAccessToken());
        const url = new URL(`${serverURL}/update`);
        const config = yield {
          method: 'GET',
          headers: authorizedHeader(id, accessToken),
        };
        const mailBoxInfo = yield call(makeMailServeAPIcall, url, config);
        console.log('Mailbox updated data received');
        const currentEmailList = yield select(makeSelectEmailList());
        const foldersToUpdate = yield findDifference(
          mailBoxInfo.folders,
          currentEmailList,
        );
        console.log(foldersToUpdate);
        for (const folder of foldersToUpdate) {
          switch (folder.action) {
            case 'delete':
              yield put(deleteFolderFromStore(folder.folder));
              break;
            case 'add':
              console.log(folder);
              yield put(
                addFolderToStore(folder.folder, {
                  emails: [],
                  ...folder.props,
                }),
              );
              break;
            case 'update':
              yield put(
                updateFolderInfo(folder.folder, { unreaded: folder.unreaded }),
              );
              yield put(
                getEmailList({
                  stepsBack: 0,
                  folder: folder.folder,
                  silent: true,
                }),
              );
              break;
            default:
              break;
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) yield put(changeDemonCounter(-1));
  }
}

function* getEmailListFromServer(action) {
  let { stepsBack, folder, silent, messageID } = action.payload;
  if (stepsBack === undefined) stepsBack = emailsBatchToLoad;
  if (silent === undefined) silent = true;
  if (!messageID) messageID = 'cannotConnectToServer';
  yield put(updateEmailListLoadingStatus(true));
  try {
    const allUIDs = yield select(makeSelectAllUIDs(folder));
    const loadedUIDs = yield select(makeSelectLoadedEmailsUIDs(folder));
    const userID = yield select(makeSelectUserID());
    const accessToken = yield select(makeSelectAccessToken());
    const url = new URL(`${serverURL}/${folder}/`);
    const params = {
      stepsBack,
      lastShownEmail: stepsBack
        ? lastShownUID(loadedUIDs, allUIDs)
        : firstShownUID(loadedUIDs, allUIDs),
    };
    url.search = new URLSearchParams(params);
    const config = yield {
      method: 'GET',
      headers: authorizedHeader(userID, accessToken),
    };

    console.log(`Requesting ${folder} emails list`);

    const resp = yield call(makeMailServeAPIcall, url, config);

    console.log(`${folder}'s emails list successfully received`);

    yield put(addEmailsToFolder(folder, resp.emailList));
    if (stepsBack === 0)
      yield put(updateFolderInfo(folder, { UIDs: resp.UIDs }));
    yield put(updateEmailListLoadingStatus(false));
    yield put(hideLoading());
  } catch (err) {
    console.log(err);
    yield put(updateEmailListLoadingStatus(false));
    yield put(hideLoading());
    if (!silent)
      yield put(showInfoMessage(msgProps('warning', messageID, 3500)));
  }
}
/*
 * Cool function to make standard api calls 
 * wich not requere futher response processing
 * simply success or errror managing 
*/
function* makeSimpleSagaAPIcall(action) {
  const rawActionDiscription = action.payload.originalType.split('/');
  const actionDescription = rawActionDiscription[
    rawActionDiscription.length - 1
  ].toLowerCase();
  const userID = yield select(makeSelectUserID());
  const accessToken = yield select(makeSelectAccessToken());
  const url = new URL(`${serverURL}/${action.payload.url}`);
  const config = yield {
    method: action.payload.method,
    headers: authorizedHeader(userID, accessToken),
  };
  const applyFn = (fn, args) => fn(...args);
  const timeout = action.payload.requestTimeout
    ? action.payload.requestTimeout
    : 10000;
  console.log(`Executing ${actionDescription}...`);
  try {
    const resp = yield call(makeMailServeAPIcall, url, config, timeout);
    if (resp.success) {
      console.log(`${actionDescription} successfully completed`);
      for (const act of action.payload.successActions) {
        yield put(applyFn(act.action, act.args));
      }
    } else {
      console.log('Error:', resp.message);
      for (const act of action.payload.errorActions) {
        yield put(applyFn(act.action, act.args));
      }
    }
  } catch (err) {
    console.log(`Oops ${actionDescription} faild :-(`);
    console.log(err);
    for (const act of action.payload.errorActions) {
      yield put(applyFn(act.action, act.args));
    }
  }
}

/*
 * fuc createFolder
 * creates folder localy, then make request to server, 
 * if error delete folder locally
*/
function* createFolder(action) {
  const successActions = [
    saccessMessage('folderSuccessfullyCreated', action.folder),
  ];
  const errorActions = [
    errorMessage('cannotConnectToServer'),
    {
      action: deleteFolderFromStore,
      args: [action.folder],
    },
  ];
  const payload = {
    method: 'POST',
    url: action.folder,
    originalType: action.type,
    requestTimeout: 8000,
    successActions,
    errorActions,
  };
  const props = {
    default: false,
    unreaded: 0,
    UIDs: [],
    emails: [],
  };
  const allFolders = yield select(makeSelectAllFolders());
  if (allFolders.indexOf(action.folder) === -1) {
    yield put(addFolderToStore(action.folder, props));
    yield put(makeSimpleAPIcall(payload));
  } else {
    yield put(
      showInfoMessage(msgProps('warning', 'folderExist', 2000, action.folder)),
    );
  }
}

/*
 * first we delete folder localy
 * then we make an api call to delete folder at server
 * if fail we restore folder locally
*/
function* deleteFolder(action) {
  yield put(hideConfirmationModal());
  const allFolders = yield select(makeSelectAllFolders());
  if (allFolders.indexOf(action.folder) !== -1) {
    const folderInfoBackup = yield select(makeSelectFolderInfo(action.folder));
    yield put(deleteFolderFromStore(action.folder));
    const errorActions = [
      errorMessage('cannotDeleteFolderNow'),
      {
        action: addFolderToStore,
        args: [action.folder, folderInfoBackup],
      },
    ];
    const payload = {
      method: 'DELETE',
      url: action.folder,
      originalType: action.type,
      requestTimeout: 8000,
      successActions: [],
      errorActions,
    };
    yield put(makeSimpleAPIcall(payload));
  } else {
    yield put(
      showInfoMessage(
        msgProps('warning', 'folderDoesntExist', 2000, action.folder),
      ),
    );
  }
}

/*
 * moveEmail function first move email locally
 * then make api call to move email at server
 * if faild, move email back to original folder
*/

function* moveEmail(action) {
  const { toFolder, emailId } = action;
  const fromFolder = yield select(makeSelectCurrentFolder());
  const backUpToFolder = yield select(makeSelectFolderInfo(toFolder));
  const backUpFromFolder = yield select(makeSelectFolderInfo(fromFolder));

  const allUIDsTo = yield select(makeSelectAllUIDs(toFolder));

  const newUID = allUIDsTo.length ? allUIDsTo[allUIDsTo.length - 1] + 1 : 1;
  const email = yield select(makeSelectEmail(fromFolder, emailId));
  const uid = email.emailId;
  email.emailId = newUID;

  yield put(deleteEmailFromFolder(fromFolder, emailId));
  yield put(addEmailsToFolder(toFolder, [email]));

  const errorActions = [
    errorMessage('cantMoveEmails'),
    {
      action: updateFolderInfo,
      args: [toFolder, backUpToFolder],
    },
    {
      action: updateFolderInfo,
      args: [fromFolder, backUpFromFolder],
    },
  ];
  const payload = {
    method: 'PUT',
    url: `${fromFolder}/${uid}/${toFolder}`,
    originalType: action.type,
    requestTimeout: 8000,
    successActions: [],
    errorActions,
  };
  yield put(makeSimpleAPIcall(payload));
}

function* emptyTrash(action) {
  const backUpTrash = yield select(makeSelectFolderInfo('Trash'));
  yield put(emptyTrashFolder());
  const errorActions = [
    errorMessage('cantEmptyFolder'),
    {
      action: updateFolderInfo,
      args: ['Trash', backUpTrash],
    },
  ];
  const payload = {
    method: 'DELETE',
    url: `trash/`,
    originalType: action.type,
    requestTimeout: 8000,
    successActions: [],
    errorActions,
  };
  yield put(makeSimpleAPIcall(payload));
}

function* deleteEmail(action) {
  const backUpTrash = yield select(makeSelectFolderInfo('Trash'));
  yield put(deleteEmailFromFolder('Trash', action.emailId));
  const errorActions = [
    errorMessage('cantDeleteEmail'),
    {
      action: updateFolderInfo,
      args: ['Trash', backUpTrash],
    },
  ];
  const payload = {
    method: 'DELETE',
    url: `trash/${action.emailId}`,
    originalType: action.type,
    requestTimeout: 8000,
    successActions: [],
    errorActions,
  };
  yield put(makeSimpleAPIcall(payload));
}

function* markUnreadedSaga(action) {
  const { emailId, isUnreaded } = action;
  console.log(isUnreaded);
  const folder = yield select(makeSelectCurrentFolder());
  yield put(markUnreaded(folder, emailId, isUnreaded));
  const errorActions = [
    errorMessage('cantChangeUnreadStatus'),
    {
      action: markUnreaded,
      args: [folder, emailId, !isUnreaded],
    },
  ];
  const payload = {
    method: 'PATCH',
    url: `${folder}/${emailId}?markUnread=${isUnreaded}`,
    originalType: action.type,
    requestTimeout: 8000,
    successActions: [],
    errorActions,
  };
  console.log(payload.url);
  yield put(makeSimpleAPIcall(payload));
}

function* search(action) {
  yield put(showLoading());
  yield put(updateFolderInfo('Search', { UIDs: [], emails: [] })); // reset to defaults
  const url = new URL(`${serverURL}/search`);
  url.search = new URLSearchParams({ keyword: action.keyword });
  const userID = yield select(makeSelectUserID());
  const accessToken = yield select(makeSelectAccessToken());
  const config = {
    method: 'GET',
    headers: authorizedHeader(userID, accessToken),
  };
  console.log(`Searching for "${action.keyword}"...`);

  try {
    const resp = yield call(makeMailServeAPIcall, url, config, 10000);
    if (resp.success) {
      console.log(`Searching successfully completed`);
      yield put(addEmailsToFolder('Search', resp.emailList));
      yield put(updateFolderInfo('Search', { UIDs: resp.UIDs }));
      yield put(changeCurrentFolder('Search'));
      yield put(updateIsSearchVisible(false));
      yield put(hideLoading());
    } else {
      console.log(resp.message);
      yield put(updateIsSearchVisible(false));
      yield put(showInfoMessage(warningMessage('wrongSearchRequest')));
    }
  } catch (err) {
    yield put(hideLoading());
    yield put(updateIsSearchVisible(false));
    yield put(showInfoMessage(errorMessage('cantExecuteSearch')));
    console.log(err);
  }
}

function* saveDraftAtServer(action) {
  console.log('Start save draft');

  const userID = yield select(makeSelectUserID());
  const accessToken = yield select(makeSelectAccessToken());

  const { draft, msgType } = action;

  const url = new URL(`${serverURL}/draft`);
  const config = {
    method: 'PUT',
    body: createMsg(draft),
    headers: authorizedHeader(userID, accessToken),
  };

  try {
    const resp = yield call(makeMailServeAPIcall, url, config, 10000);
    if (resp.success) {
      yield put(isSaveIndVisible(msgType, true));
      console.log(`Draft saved.`);
    } else {
      console.log(resp.message);
    }
  } catch (err) {
    console.log('Error during draft saving');
    console.log(err);
  }
}

function* saveDraftAtServerDebounce(action) {
  console.log('im in saveDraftAtServerDebounce');
  yield delay(debounceDelay);
  yield call(saveDraftAtServer, action);
}

function* sendEmail(action) {
  yield put(showProgressBar(true));
  const { emailType } = action;
  const email =
    emailType === 'ReplyEmail'
      ? yield select(makeSelectReplyEmailObj())
      : yield select(makeSelectNewEmailObj());
  if (emailType === 'ReplyEmail') {
    yield put(closeReplyEmail());
  } else {
    yield put(closeNewEmail());
  }

  const checkResult = isAllRecipientsValid(email);
  if (checkResult === 'no recipient') {
    yield put(showProgressBar(false));
    yield put(showInfoMessage(msgProps('warning', 'addRecipient', 3500)));
  } else if (checkResult === 'invalid email') {
    yield put(showProgressBar(false));
    yield put(showInfoMessage(msgProps('warning', 'invalidEmail', 3500)));
  } else {
    const userID = yield select(makeSelectUserID());
    const accessToken = yield select(makeSelectAccessToken());
    const url = new URL(`${serverURL}/send`);
    const config = {
      method: 'post',
      body: createMsg(email),
      headers: authorizedHeader(userID, accessToken),
    };

    try {
      const resp = yield call(makeMailServeAPIcall, url, config, 10000);
      if (resp.success) {
        yield put(showProgressBar(false));
        yield put(showInfoMessage(msgProps('success', 'messageSent', 2000)));
      } else {
        console.log(resp.message);
        yield put(showProgressBar(false));
        yield put(showInfoMessage(msgProps('error', 'cantSend', 3500)));
      }
    } catch (err) {
      console.log(err);
      yield put(showProgressBar(false));
      yield put(showInfoMessage(msgProps('error', 'cantSend', 3500)));
    }
  }
}

function* deleteDraft(action) {
  const { draftType } = action;

  if (draftType === 'ReplyEmail') {
    yield put(closeReplyEmail());
  } else {
    yield put(closeNewEmail());
  }

  /*
    const draft =
    draftType === 'ReplyEmail'
      ? yield select(makeSelectReplyEmailObj())
      : yield select(makeSelectNewEmailObj());
    const DraftID = b64EncodeUnicode(draft.MessageID);
    const payload = {
    method: 'DELETE',
    url: `draft/${DraftID}`,
    originalType: action.type,
    requestTimeout: 8000,
    successActions: [
      {
        action: console.log,
        args: ['Draft successfully deleted'],
      },
    ],
    errorActions: [
      {
        action: console.log,
        args: ['Error: cant delete draft'],
      },
    ],
  };
  yield put(makeSimpleAPIcall(payload));*/
}

/*export default function* handleEmailsUpdate() {
  yield takeLatest(GET_EMAIL_LIST, getEmailListFromServer);
  yield takeEvery(MAKE_SIMPLE_API_CALL, makeSimpleSagaAPIcall);
  yield takeEvery(CREATE_FOLDER_AT_SERVER, createFolder);
  yield takeEvery(REMOVE_FOLDER_FROM_SERVER, deleteFolder);
  yield takeEvery(MOVE_EMAIL, moveEmail);
  yield takeEvery(EMPTY_TRASH_FOLDER_AT_SERVER, emptyTrash);
  yield takeEvery(DELETE_EMAIL, deleteEmail);
  yield takeEvery(MARK_UNREADED_AT_SERVER, markUnreadedSaga);
  yield takeEvery(SERCH_KEYWORD_AT_SERVER, search);
  yield takeEvery(SAVE_DRAFT_AT_SERVER, saveDraftAtServer);
  yield takeEvery(DELETE_DRAFT, deleteDraft);
  while (yield take(SET_UPDATE_INFO_DEMON)) {
    const updateInfoTask = yield fork(mailBoxInfoUpdateDeamon);
    yield take(LOGOUT);
    yield cancel(updateInfoTask);
  }
}*/

export {
  getEmailListFromServer,
  makeSimpleSagaAPIcall,
  createFolder,
  deleteFolder,
  moveEmail,
  emptyTrash,
  deleteEmail,
  markUnreadedSaga,
  search,
  saveDraftAtServer,
  deleteDraft,
  mailBoxInfoUpdateDeamon,
  saveDraftAtServerDebounce,
  sendEmail,
};
