/**
 * Asynchronously loads the component for AddFolderModal
 */
import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "AddFolderModal" */ './index'),
);
