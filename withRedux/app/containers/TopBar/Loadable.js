/**
 * Asynchronously loads the component for TopBar
 */
import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "TopBar" */ './index'),
);
