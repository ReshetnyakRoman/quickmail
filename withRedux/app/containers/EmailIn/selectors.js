import { createSelector } from 'reselect';

const email = state => state.get('EmailIn');

const makeSelectOpenEmailData = () =>
  createSelector(email, data => data.get('openEmailInData').toJS());

export { makeSelectOpenEmailData };
