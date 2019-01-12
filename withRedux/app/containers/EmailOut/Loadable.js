/**
 * Asynchronously loads the component for EmailIn
 */
import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "EmailOut" */ './index'),
);
