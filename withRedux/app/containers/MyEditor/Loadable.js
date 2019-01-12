/**
 * Asynchronously loads the component for MyEditor
 */

// import Loadable from 'react-loadable';
// import React from 'react';

// const MyEditor = Loadable({
//   loader: () => import(/* webpackChunkName: "MyEditor" */ './index.js'),
//   loading: <div />,
//   dealy: 3000,
//   timeout: 60000, // 1min
// });

// export default MyEditor;

import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "MailBox" */ './index'),
);
