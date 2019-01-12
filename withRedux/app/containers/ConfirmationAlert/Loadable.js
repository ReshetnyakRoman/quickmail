/**
 * Asynchronously loads the component for ConfirmationAlert
 */
import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "ConfirmationAlert" */ './index'),
);
