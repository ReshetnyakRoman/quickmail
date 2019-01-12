import {
  UPDATE_MAILBOX_INFO,
  UPDATE_FOLDER_INFO,
  GET_EMAIL_LIST,
  ADD_EMAILS_TO_FOLDER,
  DELETE_EMAIL_FROM_FOLDER,
  SET_UPDATE_INFO_DEMON,
  ADD_FOLDER_TO_STORE,
  DELETE_FOLDER_FROM_STORE,
  CREATE_FOLDER_AT_SERVER,
  REMOVE_FOLDER_FROM_SERVER,
  MOVE_EMAIL,
  EMPTY_TRASH_FOLDER,
  EMPTY_TRASH_FOLDER_AT_SERVER,
  DELETE_EMAIL,
  MARK_UNREADED,
  SERCH_KEYWORD_AT_SERVER,
  DELETE_DRAFT,
  SAVE_DRAFT_AT_SERVER,
  SAVE_DRAFT_AT_SERVER_DEBOUNCE,
  MAKE_SIMPLE_API_CALL,
  MARK_UNREADED_AT_SERVER,
  OPEN_NEW_EMAIL,
  CLOSE_NEW_EMAIL,
  REPLY_EMAIL,
  CLOSE_REPLY_EMAIL,
  UPDATE_NEW_EMAIL_DATA,
  UPDATE_REPLY_EMAIL_DATA,
  UPDATE_OPEN_EMAILIN_DATA,
  SEND_EMAIL,
} from './constants';

function updateOpenEmailData(data) {
  return {
    type: UPDATE_OPEN_EMAILIN_DATA,
    data,
  };
}

function updateNewEmailData(emailObjProps) {
  return {
    type: UPDATE_NEW_EMAIL_DATA,
    emailObjProps,
  };
}

function updateReplyEmailData(emailObjProps) {
  return {
    type: UPDATE_REPLY_EMAIL_DATA,
    emailObjProps,
  };
}

function openNewEmail() {
  return {
    type: OPEN_NEW_EMAIL,
  };
}

function closeNewEmail() {
  return {
    type: CLOSE_NEW_EMAIL,
  };
}

function replyEmail(replyType) {
  return {
    type: REPLY_EMAIL,
    replyType,
  };
}

function closeReplyEmail() {
  return {
    type: CLOSE_REPLY_EMAIL,
  };
}

function makeSimpleAPIcall(payload) {
  return {
    type: MAKE_SIMPLE_API_CALL,
    payload,
  };
}

function searchKeywordAtServer(keyword) {
  return {
    type: SERCH_KEYWORD_AT_SERVER,
    keyword,
  };
}

function deleteDraft(draftType, MessageID) {
  return {
    type: DELETE_DRAFT,
    draftType,
    MessageID,
  };
}

function saveDraftAtServer(draft, msgType) {
  return {
    type: SAVE_DRAFT_AT_SERVER,
    draft,
    msgType,
  };
}

function saveDraftAtServerDebounce(draft, msgType) {
  return {
    type: SAVE_DRAFT_AT_SERVER_DEBOUNCE,
    draft,
    msgType,
  };
}

function createFolderAtServer(folder) {
  return {
    type: CREATE_FOLDER_AT_SERVER,
    folder,
  };
}

function removeFolderFromServer(folder) {
  return {
    type: REMOVE_FOLDER_FROM_SERVER,
    folder,
  };
}

function sendEmail(emailType) {
  return {
    type: SEND_EMAIL,
    emailType, // 'NewEmail' or 'ReplyEmail'
  };
}

function moveEmail(toFolder, emailId) {
  return {
    type: MOVE_EMAIL,
    toFolder,
    emailId,
  };
}

function updateMailBoxInfo(folders) {
  return {
    type: UPDATE_MAILBOX_INFO,
    folders,
  };
}

function emptyTrashFolder() {
  return {
    type: EMPTY_TRASH_FOLDER,
  };
}

function emptyTrashFolderAtServer() {
  return {
    type: EMPTY_TRASH_FOLDER_AT_SERVER,
  };
}

function deleteEmail(emailId) {
  return {
    type: DELETE_EMAIL,
    emailId,
  };
}

function markUnreaded(folder, emailId, isUnreaded) {
  return {
    type: MARK_UNREADED,
    folder,
    emailId,
    isUnreaded,
  };
}

function markUnreadedAtServer(emailId, isUnreaded) {
  return {
    type: MARK_UNREADED_AT_SERVER,
    emailId,
    isUnreaded,
  };
}

function addFolderToStore(folder, props) {
  return {
    type: ADD_FOLDER_TO_STORE,
    folder,
    props,
  };
}

function deleteFolderFromStore(folder) {
  return {
    type: DELETE_FOLDER_FROM_STORE,
    folder,
  };
}

function updateFolderInfo(folder, props) {
  return {
    type: UPDATE_FOLDER_INFO,
    folder,
    props,
  };
}

function getEmailList(payload) {
  return {
    type: GET_EMAIL_LIST,
    payload,
  };
}

function setUpdateInfoDemon(status) {
  return {
    type: SET_UPDATE_INFO_DEMON,
    status,
  };
}

function addEmailsToFolder(folder, emails) {
  return {
    type: ADD_EMAILS_TO_FOLDER,
    folder, // string
    emails, // list of emails objects
  };
}

function deleteEmailFromFolder(folder, emailId) {
  return {
    type: DELETE_EMAIL_FROM_FOLDER,
    folder,
    emailId,
  };
}

export {
  updateMailBoxInfo,
  updateFolderInfo,
  addFolderToStore,
  deleteFolderFromStore,
  getEmailList,
  addEmailsToFolder,
  deleteEmailFromFolder,
  setUpdateInfoDemon,
  createFolderAtServer,
  removeFolderFromServer,
  emptyTrashFolder,
  deleteEmail,
  markUnreaded,
  searchKeywordAtServer,
  deleteDraft,
  sendEmail,
  saveDraftAtServer,
  saveDraftAtServerDebounce,
  makeSimpleAPIcall,
  moveEmail,
  emptyTrashFolderAtServer,
  markUnreadedAtServer,
  openNewEmail,
  closeNewEmail,
  closeReplyEmail,
  updateNewEmailData,
  updateReplyEmailData,
  updateOpenEmailData,
  replyEmail,
};
