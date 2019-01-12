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
  UPDATE_SAVED_INDICATOR,
} from './constants';

/* 
 * message info is object:
 * {messageType: string, text: string, messageTimeout: int,}
*/

function showInfoMessage(messageInfo) {
  return {
    type: SHOW_INFO_MESSAGE,
    ...messageInfo,
  };
}

function updateEmailListLoadingStatus(status) {
  return {
    type: UPDATE_EMAIL_LIST_LOADING_STATUS,
    status,
  };
}

function updateIsSearchVisible(status) {
  return {
    type: UPDATE_IS_SEARCH_VISIBLE,
    status,
  };
}

function updateGetEmailStatus(status) {
  return {
    type: UPDATE_GETEMAIL_STATUS,
    status,
  };
}

function updateContentBoxStatus(status) {
  return {
    type: UPDATE_CONTENTBOX_STATUS,
    status,
  };
}

function updateContentBoxMessage(message) {
  return {
    type: UPDATE_CONTENTBOX_MESSAGE,
    message,
  };
}

function updateScreenInfo(screen, screenType) {
  return {
    type: UPDATE_SCREEN_INFO,
    screen,
    screenType,
  };
}

function showConfirmationModal(props) {
  return {
    type: SHOW_MODAL,
    props,
  };
}

function changeDemonCounter(increment) {
  return {
    type: CHANGE_DEMON_COUNTER,
    increment,
  };
}

function hideConfirmationModal() {
  return {
    type: HIDE_MODAL,
  };
}

function showAddFolderModal() {
  return {
    type: SHOW_ADD_FOLDER_MODAL,
  };
}

function hideAddFolderModal() {
  return {
    type: HIDE_ADD_FOLDER_MODAL,
  };
}

function isSaveIndVisible(msgType, status) {
  return {
    type: IS_SAVE_INDICATOR_VISIBLE,
    msgType,
    status,
  };
}

function showProgressBar(status) {
  return {
    type: HANDLE_PROGRESS_BAR,
    status,
  };
}

function changeCurrentFolder(folder) {
  return {
    type: CHANGE_CURRENT_FOLDER,
    folder,
  };
}

function hideInfoMessage() {
  return {
    type: HIDE_INFO_MESSAGE,
  };
}

function showLoading() {
  return {
    type: SHOW_LOADING,
  };
}

function hideLoading() {
  return {
    type: HIDE_LOADING,
  };
}

function updateLoadedComplete(status) {
  return {
    type: UPDATE_LOADED_COMPLETE,
    status,
  };
}

export {
  showInfoMessage,
  hideInfoMessage,
  showLoading,
  hideLoading,
  updateLoadedComplete,
  changeCurrentFolder,
  isSaveIndVisible,
  showProgressBar,
  showConfirmationModal,
  hideConfirmationModal,
  showAddFolderModal,
  hideAddFolderModal,
  changeDemonCounter,
  updateScreenInfo,
  updateIsSearchVisible,
  updateContentBoxStatus,
  updateContentBoxMessage,
  updateGetEmailStatus,
  updateEmailListLoadingStatus,
};
