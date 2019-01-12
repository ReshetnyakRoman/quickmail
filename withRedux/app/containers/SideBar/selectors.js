import { createSelector } from 'reselect';

const selectSidbar = state => state.get('SideBar');

const makeSelectIsSidebarOpen = () =>
  createSelector(selectSidbar, sidebar => sidebar.get('isSideBarOpen'));

export { makeSelectIsSidebarOpen };
