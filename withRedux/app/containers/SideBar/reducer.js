import { fromJS } from 'immutable';
import { RESET_TO_SYSTEM_INITIAL_STATE } from 'containers/LoginWithSocials/constants';
import { TOOGLE_SIDEBAR_OPEN } from './constants';

const initialState = fromJS({
  isSideBarOpen: false,
});

function sidebar(state = initialState, action) {
  switch (action.type) {
    case TOOGLE_SIDEBAR_OPEN:
      return state.set('isSideBarOpen', !state.get('isSideBarOpen'));
    case RESET_TO_SYSTEM_INITIAL_STATE:
    default:
      return state;
  }
}

export default sidebar;
