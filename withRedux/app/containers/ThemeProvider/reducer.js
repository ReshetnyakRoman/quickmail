import { fromJS } from 'immutable';

import { CHANGE_THEME } from './constants';

export const initialState = fromJS({
  isThemeDefault: true,
});

function themeProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return state.withMutations(s => {
        s.set('isThemeDefault', !s.get('isThemeDefault'));
      });
    default:
      return state;
  }
}

export default themeProviderReducer;
