/*
 * Load FB and VK SKDs
*/

import { call, select, put } from 'redux-saga/effects';
import {
  showLoading,
  hideLoading,
  showInfoMessage,
  updateLoadedComplete,
} from 'containers/App/actions';
import { updateFolderInfo } from 'containers/Mailbox/actions';
import { makeSelectUserSocial } from 'containers/LoginWithSocials/selectors';

import {
  resetToSystemInitialState,
  updateLoggedInState,
  updateUserData,
} from './actions';
import {
  loadVKSDK,
  loadFBSDK,
  logoutFromSocial,
  loginToSocial,
  getUserInfoFromSocial,
  isUserLoggedToSocial,
} from './socialsAPI';
import getUserDataFromServer from './getUserDataFromServer';

export function* getSDK(action) {
  if (action.social === 'VK') yield call(loadVKSDK);
  else yield call(loadFBSDK);
}

export function* logout() {
  // const social = yield select(s => s.getIn(['Login', 'userData', 'loginType']));
  const social = yield select(makeSelectUserSocial());
  yield call(logoutFromSocial, social);
  yield put(resetToSystemInitialState());
  yield put(updateLoggedInState(false));
}

export function* login(action) {
  yield put(showLoading(true));

  const { social } = action;
  const accessToken = yield call(loginToSocial, social);

  yield collectUserDataAndLogin(social, accessToken);
}

export function* isUserConnedtedToSocial() {
  const data = yield call(isUserLoggedToSocial);
  if (data) {
    const { social, accessToken } = data;
    yield collectUserDataAndLogin(social, accessToken);
  } else {
    yield put(updateLoadedComplete(true));
  }
}

export function* collectUserDataAndLogin(social, accessToken) {
  try {
    const SocialUserData = yield call(getUserInfoFromSocial, social);

    const { userData, foldersWithInfo } = yield call(
      getUserDataFromServer,
      SocialUserData,
      social,
      accessToken,
    );
    yield put(updateUserData(userData));
    for (const folder of foldersWithInfo) {
      const props = {
        default: folder.default,
        unreaded: folder.unreaded,
        UIDs: folder.UIDs,
      };
      if (!folder.default) props.emails = [];
      yield put(updateFolderInfo(folder.folder, props));
    }
    yield put(showLoading());
    yield put(updateLoggedInState(true));
    yield put(updateLoadedComplete(true));
    yield put(hideLoading());
  } catch (err) {
    yield console.log(err);
    yield put(hideLoading());
    yield put(updateLoggedInState(false));
    yield put(updateLoadedComplete(true));
    yield put(
      showInfoMessage({
        messageType: 'warning',
        messageID: 'cannotConnectToServer',
        timeout: 3000,
      }),
    );
  }
}
