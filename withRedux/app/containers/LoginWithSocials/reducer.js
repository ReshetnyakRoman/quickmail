import { fromJS } from 'immutable';
import {
  UPDATE_LOGGED_IN_STATE,
  UPDATE_USER_DATA,
  RESET_TO_SYSTEM_INITIAL_STATE,
} from './constants';

const userData = {
  email: 'unknown',
  name: 'unknown',
  ID: '',
  loginType: '',
  accessToken: '',
};

const inititalState = fromJS({
  isLoggedIn: false,
  userData,
});

function socialsReducer(state = inititalState, action) {
  switch (action.type) {
    case UPDATE_LOGGED_IN_STATE:
      return state.set('isLoggedIn', action.status);
    case UPDATE_USER_DATA:
      return state.set('userData', fromJS(action.data));
    case RESET_TO_SYSTEM_INITIAL_STATE:
      return inititalState;
    default:
      return state;
  }
}

export default socialsReducer;
