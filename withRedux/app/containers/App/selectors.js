import { createSelector } from 'reselect';

const selectServices = state => state.getIn(['App', 'Services']);
const selectRoute = state => state.get('router');

const makeSelectPathname = () =>
  createSelector(selectRoute, routeState =>
    routeState.getIn(['location', 'pathname']),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectCurrentFolder = () =>
  createSelector(selectServices, services => services.get('currentFolder'));

const makeSelectIsEmailListLoading = () =>
  createSelector(selectServices, services =>
    services.get('isEmailListLoading'),
  );

const makeSelectMsgParametr = () =>
  createSelector(selectServices, services =>
    services.getIn(['showInfoMessage', 'msgParametr']),
  );

const makeSelectMessageType = () =>
  createSelector(selectServices, services =>
    services.getIn(['showInfoMessage', 'messageType']),
  );

const makeSelectIsMsgVisible = () =>
  createSelector(selectServices, services =>
    services.getIn(['showInfoMessage', 'isVisible']),
  );

const makeSelectMessageID = () =>
  createSelector(selectServices, services =>
    services.getIn(['showInfoMessage', 'messageID']),
  );
const makeSelectIsAppLoaded = () =>
  createSelector(selectServices, services => services.get('isAppLoaded'));

const makeSelectDemonCounter = () =>
  createSelector(selectServices, services =>
    services.get('updateDemonCounter'),
  );

const makeSelectShowProgressBar = () =>
  createSelector(selectServices, services => services.get('showProgressBar'));

const makeSelectIsLoading = () =>
  createSelector(selectServices, services => services.get('isLoading'));

const makeSelectConfAlertIsVisible = () =>
  createSelector(selectServices, services =>
    services.getIn(['confirmationModal', 'isVisible']),
  );

const makeSelectConfAlertHeaderID = () =>
  createSelector(selectServices, services =>
    services.getIn(['confirmationModal', 'headerID']),
  );
const makeSelectConfAlertBodyID = () =>
  createSelector(selectServices, services =>
    services.getIn(['confirmationModal', 'bodyID']),
  );

const makeSelectConfAlertAgree = () =>
  createSelector(selectServices, services =>
    services.getIn(['confirmationModal', 'agreeButtonTextID']),
  );

const makeSelectConfAlertDisagree = () =>
  createSelector(selectServices, services =>
    services.getIn(['confirmationModal', 'disagreeButtonTextID']),
  );

const makeSelectConfAlertFolder = () =>
  createSelector(selectServices, services =>
    services.getIn(['confirmationModal', 'folder']),
  );
const makeSelectAddFolderIsVisible = () =>
  createSelector(selectServices, services =>
    services.getIn(['addFolderModal', 'isVisible']),
  );
const makeSelectScreenType = () =>
  createSelector(selectServices, services => services.get('screenType'));

const makeSelectIsSearchVisible = () =>
  createSelector(selectServices, services => services.get('isSearchVisible'));

const makeSelectContentBoxStatus = () =>
  createSelector(selectServices, services => services.get('contentBoxStatus'));

const makeSelectContentBoxMessage = () =>
  createSelector(selectServices, services => services.get('contentBoxMessage'));

const makeSelectGetEmailStatus = () =>
  createSelector(selectServices, services => services.get('getEmailStatus'));

const makeSelectIsSaveIndVisible = () =>
  createSelector(selectServices, services =>
    services.get('isSavedIndVisible').toJS(),
  );

export {
  makeSelectMsgParametr,
  makeSelectMessageType,
  makeSelectMessageID,
  makeSelectIsAppLoaded,
  makeSelectIsMsgVisible,
  makeSelectPathname,
  makeSelectCurrentFolder,
  makeSelectIsLoading,
  makeSelectShowProgressBar,
  makeSelectConfAlertIsVisible,
  makeSelectConfAlertHeaderID,
  makeSelectConfAlertBodyID,
  makeSelectConfAlertAgree,
  makeSelectConfAlertDisagree,
  makeSelectConfAlertFolder,
  makeSelectAddFolderIsVisible,
  makeSelectLocation,
  makeSelectDemonCounter,
  makeSelectScreenType,
  makeSelectIsSearchVisible,
  makeSelectContentBoxStatus,
  makeSelectContentBoxMessage,
  makeSelectGetEmailStatus,
  selectServices,
  makeSelectIsEmailListLoading,
  makeSelectIsSaveIndVisible,
};
