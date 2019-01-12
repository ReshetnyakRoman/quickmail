/*
 * Login Actions
*/

import {
  LOAD_SOCIAL_SDK,
  UPDATE_USER_DATA,
  UPDATE_LOGGED_IN_STATE,
  RESET_TO_SYSTEM_INITIAL_STATE,
  LOGOUT,
  LOGIN,
  IS_USER_LOGGED_TO_SOCIAL,
} from './constants';

function loadSocialSDK(social) {
  return {
    type: LOAD_SOCIAL_SDK,
    social,
  };
}

function updateUserData(data) {
  return {
    type: UPDATE_USER_DATA,
    data,
  };
}

function updateLoggedInState(status) {
  return {
    type: UPDATE_LOGGED_IN_STATE,
    status,
  };
}

function resetToSystemInitialState() {
  return {
    type: RESET_TO_SYSTEM_INITIAL_STATE,
  };
}

function logoutFromSocial() {
  return {
    type: LOGOUT,
  };
}

function loginToSocial(social) {
  return {
    type: LOGIN,
    social,
  };
}

function isUserLoggedToSocial() {
  return {
    type: IS_USER_LOGGED_TO_SOCIAL,
  };
}

export {
  loadSocialSDK,
  updateUserData,
  updateLoggedInState,
  resetToSystemInitialState,
  logoutFromSocial,
  loginToSocial,
  isUserLoggedToSocial,
};
