import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectCurrenUserData = state => state.getIn(['Login', 'userData']);
const selectLogIn = state => state.get('Login', fromJS({ isLoggedIn: false }));

const makeSelectIsLoggedIn = () =>
  createSelector(selectLogIn, login => login.get('isLoggedIn'));

const makeSelectUserID = () =>
  createSelector(selectCurrenUserData, userData => userData.get('ID'));

const makeSelectAccessToken = () =>
  createSelector(selectCurrenUserData, userData => userData.get('accessToken'));

const makeSelectUserSocial = () =>
  createSelector(selectCurrenUserData, userData => userData.get('loginType'));

const makeSelectUserInfo = () =>
  createSelector(selectCurrenUserData, userData => userData.toJS());

const makeSelectUserName = () =>
  createSelector(selectCurrenUserData, userData =>
    userData.getIn(['UserData', 'name']),
  );

const makeSelectUserEmail = () =>
  createSelector(selectCurrenUserData, userData =>
    userData.getIn(['UserData', 'email']),
  );

export {
  makeSelectUserSocial,
  makeSelectUserID,
  makeSelectAccessToken,
  makeSelectIsLoggedIn,
  makeSelectUserInfo,
  makeSelectUserName,
  makeSelectUserEmail,
};
