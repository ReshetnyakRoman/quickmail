import { UPDATE_OPEN_EMAIL_DATA } from './constants';

function updateOpenEmailData(data) {
  return {
    type: UPDATE_OPEN_EMAIL_DATA,
    data,
  };
}

export { updateOpenEmailData };
