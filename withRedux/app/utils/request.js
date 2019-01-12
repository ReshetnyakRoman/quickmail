import { fetchTimeout } from 'config';

export default function fetchWithTimeOut(url, config, timeout) {
  return new Promise((resolve, reject) => {
    // Set timeout timer
    const timer = setTimeout(() => {
      reject(new Error('Long response time from server, request timed out'));
    }, timeout);
    fetch(url, config)
      .then(response => resolve(response), err => reject(err))
      .then(() => clearTimeout(timer));
  });
}

export function makeMailServeAPIcall(url, config, timeout = fetchTimeout) {
  return new Promise((resolve, reject) => {
    fetchWithTimeOut(url, config, timeout)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
}

export function authorizedHeader(ID, accessToken) {
  return {
    Accept: 'application/json, text/plain, */*',
    ID,
    Authorization: `Bearer ${accessToken}`,
  };
}
