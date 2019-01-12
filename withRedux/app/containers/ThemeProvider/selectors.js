import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectTheme = state => state.get('theme', initialState);

/**
 * Select the language locale
 */

const makeSelectIsThemeDefault = () =>
  createSelector(selectTheme, theme => theme.get('isThemeDefault'));

export { selectTheme, makeSelectIsThemeDefault };
