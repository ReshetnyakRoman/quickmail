import { defineMessages } from 'react-intl';

export default defineMessages({
  default: {
    id: 'withRedux.components.App.default',
    defaultMessage: 'Hello!',
  },
  slowConnectionMessage: {
    id: 'withRedux.components.App.slowConnectionMessage',
    defaultMessage: 'Slow connection, you will see emails once loading compete',
  },
  cannotConnectToServer: {
    id: 'withRedux.components.App.cannotConnectToServer',
    defaultMessage: 'Oops, cant connect to server, please try later :-(',
  },
  folderSuccessfullyCreated: {
    id: 'withRedux.components.App.folderSuccessfullyCreated',
    defaultMessage: 'Folder "{msgParametr}" successfully created',
  },
  folderSuccessfullyRemoved: {
    id: 'withRedux.components.App.folderSuccessfullyRemoved',
    defaultMessage: 'Folder "{msgParametr}" successfully removed',
  },
  folderExist: {
    id: 'withRedux.components.App.folderExist',
    defaultMessage: 'Folder "{msgParametr}" already exist',
  },
  folderDoesntExist: {
    id: 'withRedux.components.App.folderDoesntExist',
    defaultMessage: 'Folder "{msgParametr}" dosnt exist',
  },
  wrongRequest: {
    id: 'withRedux.components.App.wrongRequest',
    defaultMessage: 'Wrong request :(',
  },
  somethingGoesWrong: {
    id: 'withRedux.components.App.somethingGoesWrong',
    defaultMessage: 'Oops something goes wrong, try later :(',
  },
  cannotDeleteFolderNow: {
    id: 'withRedux.components.App.cannotDeleteFolderNow',
    defaultMessage: 'Cant detete folder not, try later :-(',
  },
  cantMoveEmails: {
    id: 'withRedux.components.App.cannotMoveEmails',
    defaultMessage: 'Oops, cant move email now, try later :-(',
  },
  cantEmptyFolder: {
    id: 'withRedux.components.App.cannotEmptyFolder',
    defaultMessage: 'Oops, cant empty Trash now, try later :-(',
  },
  cantDeleteEmail: {
    id: 'withRedux.components.App.cantDeleteEmail',
    defaultMessage: 'Oops, cant delete email now, try later :-(',
  },
  cantChangeUnreadStatus: {
    id: 'withRedux.components.App.cantChangeUnreadStatus',
    defaultMessage: 'Oops, cant change unreaded status now, try later :-(',
  },
  cantExecuteSearch: {
    id: 'withRedux.components.App.cantExecuteSearch',
    defaultMessage: 'Sorry, cant execute search now, try later :-(',
  },
  wrongSearchRequest: {
    id: 'withRedux.components.App.wrongSearchRequest',
    defaultMessage: 'Sorry, nothing was found :-(',
  },
  deleteFolderConfirmationHeader: {
    id: 'withRedux.components.App.deleteFolderConfirmationHeader',
    defaultMessage: 'PLEASE CONFIRM',
  },
  deleteFolderConfirmationBody: {
    id: 'withRedux.components.App.deleteFolderConfirmationBody',
    defaultMessage: 'Delete folder "{msgParametr}" ?',
  },
  deleteFolderConfirmationAgree: {
    id: 'withRedux.components.App.deleteFolderConfirmationAgree',
    defaultMessage: 'Delete',
  },
  deleteFolderConfirmationDisAgree: {
    id: 'withRedux.components.App.deleteFolderConfirmationDisAgree',
    defaultMessage: 'No',
  },

  addFolderHeaderID: {
    id: 'withRedux.components.App.addFolderHeaderID',
    defaultMessage: 'ADD NEW FOLDER',
  },
  addFolderFormTextID: {
    id: 'withRedux.components.App.addFolderFormTextID',
    defaultMessage: 'Folder name',
  },
  addFolderAgreeID: {
    id: 'withRedux.components.App.addFolderAgreeID',
    defaultMessage: 'Add',
  },
  addFolderDisagreeID: {
    id: 'withRedux.components.App.addFolderDisagreeID',
    defaultMessage: 'Cancel',
  },

  toogleThemeID: {
    id: 'withRedux.components.App.toogleThemeID',
    defaultMessage: '{msgParametr}',
  },

  toogleLangID: {
    id: 'withRedux.components.App.toogleLangID',
    defaultMessage: '{msgParametr}',
  },
  messageSent: {
    id: 'withRedux.components.App.messageSent',
    defaultMessage: 'Message sent',
  },
  cantSend: {
    id: 'withRedux.components.App.cantSend',
    defaultMessage: 'Cant send message now, try later!',
  },
  warning: {
    id: 'withRedux.components.App.warning',
    defaultMessage: 'Warning!',
  },
  addRecipient: {
    id: 'withRedux.components.App.addRecipient',
    defaultMessage: 'Add at least one recipient!',
  },
  invalidEmail: {
    id: 'withRedux.components.App.invalidEmail',
    defaultMessage: 'One of emails incorrect!',
  },
});
