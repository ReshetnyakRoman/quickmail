/*
 * This is mudule with all reaquired api call to socials,
 * sucha as: SKL loading, login future, is connected to socials status check
*/
import { vkAppID, FbAppID } from '../../config';

/* auxilary function to asychroniusly load SDKs */
function Deferred() {
  const self = this;
  this.promise = new Promise((resolve, reject) => {
    self.reject = reject;
    self.resolve = resolve;
  });
}

/* Loding socials SDK */

function loadVKSDK() {
  setTimeout(() => {
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = '//vk.com/js/api/openapi.js';
    el.async = true;
    document.getElementById('vk_api_transport').appendChild(el);
  }, 0);

  window.vkLoaded = new Deferred();

  window.vkAsyncInit = () => {
    window.VK.init({
      apiId: vkAppID,
    });
    window.vkLoaded.resolve(true);
    console.log('VK API loaded');
  };
}

function loadFBSDK() {
  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  window.fbLoaded = new Deferred();

  window.fbAsyncInit = () => {
    window.FB.init({
      appId: FbAppID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.1',
    });
    window.fbLoaded.resolve(true);
    console.log('FB API loaded');
  };
}

/* check is user connected to social  */

function isUserLoggedToSocial() {
  return new Promise((resolve, reject) => {
    window.vkLoaded.promise.then(() => {
      window.VK.Auth.getLoginStatus(responseVK => {
        if (responseVK.status === 'connected') {
          console.log('connected to VK');
          resolve({ accessToken: responseVK.session, social: 'VK' });
        } else {
          console.log(responseVK.status, 'in VK');

          window.fbLoaded.promise
            .then(() => {
              window.FB.getLoginStatus(responseFB => {
                if (responseFB.status === 'connected') {
                  console.log('connected to FB');
                  resolve({
                    accessToken: responseFB.authResponse.accessToken,
                    social: 'FB',
                  });
                } else {
                  console.log('User not connected to any socials');
                  resolve(false);
                }
              });
            })
            .catch(resolve(false));
        }
      });
    });
  });
}

function loginToSocial(social) {
  const login = social === 'FB' ? window.FB.login : window.VK.Auth.login;

  return new Promise(resolve => {
    console.log(`Start logging in ${social} ....`);

    login(rsp => {
      console.log(`Recieved user-data from ${social}`);
      resolve(social === 'FB' ? rsp.authResponse.accessToken : rsp.session);
    });
  });
}

/*
 * Below func requesting user profile info 
 * from VK and FB api's and pass it for futher processing
*/

async function getUserInfoFromSocial(social) {
  return new Promise(resolve => {
    if (social === 'VK') {
      window.VK.api(
        'users.get',
        { fields: 'photo_200,first_name,last_name,uid', version: 5.8 },
        res => resolve(res),
      );
    } else {
      window.FB.api(
        `/me`,
        'GET',
        { fields: 'name,id,picture.width(200).height(200)' },
        res => resolve(res),
      );
    }
  });
}

async function logoutFromSocial(social) {
  const logout = social === 'FB' ? window.FB.logout : window.VK.Auth.logout;
  return new Promise(resolve => {
    logout(() => {
      console.log(`Logged out from ${social} and QuickMail`);
      resolve();
    });
  });
}

export {
  loadFBSDK,
  loadVKSDK,
  loginToSocial,
  isUserLoggedToSocial,
  getUserInfoFromSocial,
  logoutFromSocial,
};
