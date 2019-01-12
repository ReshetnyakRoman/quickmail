/**
 * Asynchronously loads the component for Sidbar
 */
import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "Sidebar" */ './index'),
);
