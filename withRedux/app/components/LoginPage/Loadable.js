/**
 * Asynchronously loads the component for MailBox
 */
import Loadable from 'react-loadable';

import { MainLoader } from 'components/MainLoader';

export default Loadable({
  loader: () => import(/* webpackChunkName: "LoginPage" */ './index'),
  loading: MainLoader,
  dealy: 3000,
  timeout: 60000,
});
