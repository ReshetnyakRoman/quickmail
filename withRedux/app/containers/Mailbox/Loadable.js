/**
 * Asynchronously loads the component for MailBox
 */
import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "MailBox" */ './index'),
);
