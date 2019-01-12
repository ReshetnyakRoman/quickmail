// const serverURL = 'http://127.0.0.1:5000/api/v1'
const serverURL = 'https://mail.stepanich.ru/api/v1';
export default serverURL;
const domainName = '@stepanich.ru';
const vkAppID = 6719438;
const FbAppID = '1944357025611194';
const mailboxUpdateInterval = 15000; // 15sec
const fetchTimeout = 10000; // 10sec
const popUpMessageTimeOut = 6000; // 6sec
const emailsBatchToLoad = 5;
const Types = {
  email: 'email', // drug and drop item types
};
const defaultFolders = ['Trash', 'Sent', 'Draft'];
const allDefaultFolders = ['Inbox', 'Trash', 'Sent', 'Draft'];
const animation = {
  defaultConfig: { stiffness: 90, damping: 7 },
  emailListConfig: { stiffness: 90, damping: 10 },
  newEmailConfig: { stiffness: 80, damping: 10 },
  searchConfig: { stiffness: 90, damping: 7 },
  currentFolderConfig: { stiffness: 90, damping: 7 },
};
const debounceDelay = 6000;

export {
  mailboxUpdateInterval,
  fetchTimeout,
  FbAppID,
  vkAppID,
  domainName,
  emailsBatchToLoad,
  popUpMessageTimeOut,
  Types,
  animation,
  defaultFolders,
  allDefaultFolders,
  debounceDelay,
};
