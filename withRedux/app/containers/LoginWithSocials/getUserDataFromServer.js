import fetchWithTimeOut from 'utils/request';
import serverURL from 'config';

async function getUserDataFromServer(response, loginType, accessToken) {
  const userData = {
    name:
      loginType === 'FB'
        ? response.name
        : response.response[0].first_name +
          ' ' +
          response.response[0].last_name,
    ID:
      loginType === 'FB'
        ? response.id.toString()
        : response.response[0].uid.toString(),
    pic:
      loginType === 'FB'
        ? response.picture.data.url
        : response.response[0].photo_200,
    lastUID: 0,
    UIDs: [],
    loginType,
    accessToken,
  };

  const url = new URL(`${serverURL}/auth`);
  const payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };
  const timeout = 15000; // 15sec

  return new Promise((resolve, reject) =>
    fetchWithTimeOut(url, payload, timeout)
      .then(res => res.json())
      .then(console.log('Recieved user-data from QM-server'))
      .then(res => {
        userData.email = res.email;
        userData.accessToken = res.accessToken;
        resolve({ userData, foldersWithInfo: res.foldersWithInfo });
      })
      .catch(err => reject(err)),
  );
}

export default getUserDataFromServer;
