webpackJsonp([3],{319:function(e,n,t){"use strict";function o(e){return i.a.createElement("div",{className:"login"},i.a.createElement("div",{className:"gradient"}),i.a.createElement("div",{className:"login-inner"},i.a.createElement("div",{className:"login-content"},i.a.createElement("p",{className:"pb-5"},i.a.createElement("span",null,i.a.createElement("span",{className:"welcometext"},"Welcome to")," ",i.a.createElement("br",null),i.a.createElement("span",{className:"logo"},i.a.createElement("span",{className:"logo-red"},"Q"),"uick",i.a.createElement("span",{className:"logo-blue"},"M"),"ail"))),i.a.createElement("button",{className:"btn-fb",onClick:function(){return e.login("FB")},"data-scope":"public_profile"},"Login with",i.a.createElement("img",{alt:"facebook logo",src:"./img/facebook-logo.png"})),i.a.createElement("hr",{className:"log-in-hr"}),i.a.createElement(c.b,{to:"/inbox",className:"LinkToDefaults"},i.a.createElement("button",{className:"btn-vk",onClick:function(){return e.login("VK")}},"Login with",i.a.createElement("img",{alt:"vk-logo",src:"./img/vk-logo.svg"}))),i.a.createElement("div",{className:"about-block position-relative"},"About project",i.a.createElement("div",{className:"about-popup"},'"QuickMail" is one more mail-service for you!',i.a.createElement("ul",{className:""},i.a.createElement("li",null,"It's free"),i.a.createElement("li",null,"No registration, simply login with your socials"),i.a.createElement("li",null,"Clean & Simple Descktop and Mobile interface")))))))}Object.defineProperty(n,"__esModule",{value:!0});var r=t(0),i=t.n(r),a=t(355),s=t(356),c=t(61),l=Object(s.a)(Object(a.a)(o));n.default=l},355:function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function i(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function a(){var e=this;this.promise=new Promise(function(n,t){e.reject=t,e.resolve=n})}function s(e){return function(n){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.loadFBSDK=n.loadFBSDK.bind(n),n.loadVKSDK=n.loadVKSDK.bind(n),n}return i(t,n),p(t,[{key:"loadFBSDK",value:function(){!function(e,n,t){var o,r=e.getElementsByTagName(n)[0];e.getElementById(t)||(o=e.createElement(n),o.id=t,o.src="https://connect.facebook.net/en_US/sdk.js",r.parentNode.insertBefore(o,r))}(document,"script","facebook-jssdk"),console.log("Loading FB API"),window.fbLoaded=new a,window.fbAsyncInit=function(){window.FB.init({appId:u.a,autoLogAppEvents:!0,xfbml:!0,version:"v3.1"}),window.fbLoaded.resolve()}}},{key:"loadVKSDK",value:function(){setTimeout(function(){var e=document.createElement("script");e.type="text/javascript",e.src="//vk.com/js/api/openapi.js",e.async=!0,document.getElementById("vk_api_transport").appendChild(e)},0),console.log("Loading VK API"),window.vkLoaded=new a,window.vkAsyncInit=function(){window.VK.init({apiId:u.d}),window.vkLoaded.resolve()}}},{key:"componentDidMount",value:function(){this.loadFBSDK(),this.loadVKSDK()}},{key:"render",value:function(){return l.a.createElement(e,this.props)}}]),t}(l.a.Component)}n.a=s;var c=t(0),l=t.n(c),u=t(8),p=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()},356:function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function i(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function a(e){return function(n){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.login=n.login.bind(n),n}return i(t,n),u(t,[{key:"login",value:function(e){var n=this;console.log("Start logging in "+e+" ...."),"FB"===e?window.FB.login(function(e){return Object(l.a)(e,"FB",e.authResponse.accessToken,n)}):window.VK.Auth.login(function(e){return Object(l.a)(e,"VK",e.session,n)})}},{key:"componentDidMount",value:function(){var e=this;window.vkLoaded.promise.then(function(){window.VK.Auth.getLoginStatus(function(e){var n=this;"connected"===e.status?(console.log("connected to VK"),this.login("VK")):"not_authorized"===e.status?(console.log("not_authorized in VK and my application"),this.props.onLoadingComplete(!0),this.props.isShowLoading(!1)):(console.log("User not logged in to VK"),this.props.onLoadingComplete(!0),this.props.isShowLoading(!1),window.fbLoaded.promise.then(function(){window.FB.getLoginStatus(function(e){"connected"===e.status?(console.log("connected to FB"),this.login("FB")):"authorization_expired"===e.status?(console.log("FB authorization_expired"),this.props.onLoadingComplete(!0)):"not_authorized"===e.status?(console.log("not_authorized in FB and my application"),this.props.onLoadingComplete(!0),this.props.isShowLoading(!1)):(console.log("User not logged in to Facebook"),this.props.onLoadingComplete(!0),this.props.isShowLoading(!1))}.bind(n))}))}.bind(e))})}},{key:"render",value:function(){return c.a.createElement(e,Object.assign({},this.props,{login:this.login}))}}]),t}(c.a.Component)}n.a=a;var s=t(0),c=t.n(s),l=t(357),u=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}()},357:function(e,n,t){"use strict";function o(e){return function(){var n=e.apply(this,arguments);return new Promise(function(e,t){function o(r,i){try{var a=n[r](i),s=a.value}catch(e){return void t(e)}if(!a.done)return Promise.resolve(s).then(function(e){o("next",e)},function(e){o("throw",e)});e(s)}return o("next")})}}var r=t(62),i=t.n(r),a=t(358),s=function(){var e=o(i.a.mark(function e(n,t,o,r){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:"connected"===n.status?"VK"===t?window.VK.api("users.get",{fields:"photo_200,first_name,last_name,uid",version:5.8},function(e){return Object(a.a)(e,t,o,r)}):window.FB.api("/me","GET",{fields:"name,id,picture.width(200).height(200)"},function(e){return Object(a.a)(e,t,o,r)}):r.props.handleLoggedInState(!1,{email:"",name:"",ID:"",pic:"",loginType:""});case 1:case"end":return e.stop()}},e,this)}));return function(n,t,o,r){return e.apply(this,arguments)}}();n.a=s},358:function(e,n,t){"use strict";function o(e){return function(){var n=e.apply(this,arguments);return new Promise(function(e,t){function o(r,i){try{var a=n[r](i),s=a.value}catch(e){return void t(e)}if(!a.done)return Promise.resolve(s).then(function(e){o("next",e)},function(e){o("throw",e)});e(s)}return o("next")})}}var r=t(62),i=t.n(r),a=t(8),s=t(65),c=function(){var e=o(i.a.mark(function e(n,t,o,r){var c,l;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n&&!n.error?(r.props.isShowLoading(!0),console.log("Recieved user-data from "+t),c={name:"FB"===t?n.name:n.response[0].first_name+" "+n.response[0].last_name,ID:"FB"===t?n.id.toString():n.response[0].uid.toString(),pic:"FB"===t?n.picture.data.url:n.response[0].photo_200,loginType:t,accessToken:o,lastUID:0,UIDs:[]},console.log(JSON.stringify(c)),Object(s.a)(a.b+"/auth",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(c)},1e4).then(function(e){return e.json()}).then(console.log("Recieved user-data from QM-server")).then(function(e){return c.email=e.email,c.accessToken=e.accessToken,l=e.foldersWithInfo,e}).then(function(e){var n=!0;e.success||(c={email:"unknown",name:"unknown",ID:"",loginType:"",accessToken:""},n=!1,r.props.onLoginError("Oops, error during user registration :-(")),r.props.handleFoldersInfo(l),r.props.handleCurrentUserData(c),r.props.handleLoggedInState(n),r.props.onLoadingComplete(!0)}).catch(function(e){console.log(e),r.props.isShowLoading(!1),r.props.onLoginError("Oops, cant connect to server, please try later :-("),r.props.handleLoggedInState(!1)})):(r.props.isShowLoading(!1),r.props.onLoginError("Oops, cant connect "+t+" Server :-("),console.log(n.error));case 1:case"end":return e.stop()}},e,this)}));return function(n,t,o,r){return e.apply(this,arguments)}}();n.a=c}});
//# sourceMappingURL=Login.58ccab16.chunk.js.map