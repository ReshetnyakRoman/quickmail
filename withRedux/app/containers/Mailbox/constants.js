const GET_EMAIL_LIST = 'Mailbox/GET_EMAIL_LIST';
const ADD_FOLDER_TO_STORE = 'Mailbox/ADD_FOLDER_TO_STORE';
const DELETE_FOLDER_FROM_STORE = 'Mailbox/DELETE_FOLDER_FROM_STORE';
const ADD_EMAILS_TO_FOLDER = 'Mailbox/ADD_EMAILS_TO_FOLDER';
const DELETE_EMAIL_FROM_FOLDER = 'Mailbox/DELETE_EMAIL_FROM_FOLDER';
const SET_UPDATE_INFO_DEMON = 'Mailbox/SET_UPDATE_INFO_DEMON';
const UPDATE_FOLDER_INFO = 'Mailbox/UPDATE_FOLDER_INFO';
const UPDATE_MAILBOX_INFO = 'Mailbox/UPDATE_MAILBOX_INFO';
const CREATE_FOLDER_AT_SERVER = 'Mailbox/CREATE_FOLDER_AT_SERVER';
const REMOVE_FOLDER_FROM_SERVER = 'Mailbox/REMOVE_FOLDER_FROM_SERVER';
const MOVE_EMAIL = 'Mailbox/MOVE_EMAIL';
const EMPTY_TRASH_FOLDER = 'Mailbox/EMPTY_TRASH_FOLDER';
const EMPTY_TRASH_FOLDER_AT_SERVER = 'Mailbox/EMPTY_TRASH_FOLDER_AT_SERVER';
const DELETE_EMAIL = 'Mailbox/DELETE_EMAIL'; //  delete single emails in Trash (locacly and server)
const MARK_UNREADED = 'Mailbox/MARK_UNREADED';
const MARK_UNREADED_AT_SERVER = 'Mailbox/MARK_UNREADED_AT_SERVER';
const SERCH_KEYWORD_AT_SERVER = 'Mailbox/SERCH_KEYWORD_AT_SERVER';
const DELETE_DRAFT = 'Mailbox/DELETE_DRAFT'; // Delete draft from server when user click on delete draft button
const SAVE_DRAFT_AT_SERVER = 'Mailbox/SAVE_DRAFT_AT_SERVER';
const MAKE_SIMPLE_API_CALL = 'Mailbox/MAKE_SIMPLE_API_CALL';
const OPEN_NEW_EMAIL = 'Mailbox/OPEN_NEW_EMAIL';
const CLOSE_NEW_EMAIL = 'Mailbox/CLOSE_NEW_EMAIL';
const REPLY_EMAIL = 'Mailbox/REPLY_EMAIL';
const CLOSE_REPLY_EMAIL = 'Mailbox/CLOSE_REPLY_EMAIL';
const UPDATE_NEW_EMAIL_DATA = 'Mailbox/UPDATE_NEW_EMAIL_DATA';
const UPDATE_REPLY_EMAIL_DATA = 'Mailbox/UPDATE_REPLY_EMAIL_DATA';
const UPDATE_OPEN_EMAILIN_DATA = 'Mailbox/UPDATE_OPEN_EMAILIN_DATA';
const SAVE_DRAFT_AT_SERVER_DEBOUNCE = 'Mailbox/SAVE_DRAFT_AT_SERVER_DEBOUNCE';
const SEND_EMAIL = 'Mailbox/SEND_EMAIL';
export {
  GET_EMAIL_LIST,
  ADD_FOLDER_TO_STORE,
  DELETE_FOLDER_FROM_STORE,
  ADD_EMAILS_TO_FOLDER,
  DELETE_EMAIL_FROM_FOLDER,
  SET_UPDATE_INFO_DEMON,
  UPDATE_FOLDER_INFO,
  UPDATE_MAILBOX_INFO,
  CREATE_FOLDER_AT_SERVER,
  REMOVE_FOLDER_FROM_SERVER,
  MOVE_EMAIL,
  EMPTY_TRASH_FOLDER,
  EMPTY_TRASH_FOLDER_AT_SERVER,
  DELETE_EMAIL,
  MARK_UNREADED,
  MARK_UNREADED_AT_SERVER,
  SERCH_KEYWORD_AT_SERVER,
  MAKE_SIMPLE_API_CALL,
  DELETE_DRAFT,
  SAVE_DRAFT_AT_SERVER,
  SAVE_DRAFT_AT_SERVER_DEBOUNCE,
  OPEN_NEW_EMAIL,
  CLOSE_NEW_EMAIL,
  CLOSE_REPLY_EMAIL,
  UPDATE_NEW_EMAIL_DATA,
  UPDATE_REPLY_EMAIL_DATA,
  UPDATE_OPEN_EMAILIN_DATA,
  REPLY_EMAIL,
  SEND_EMAIL,
};
