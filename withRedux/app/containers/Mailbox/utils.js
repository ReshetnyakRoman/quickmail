import EmailValidation from 'utils/EmailValidation';
import { isEqual } from 'lodash';
import { isSaveIndVisible } from '../App/actions';
import { saveDraftAtServer, saveDraftAtServerDebounce } from './actions';

/*
 * args: 
 *  newFoldersData - list of objects [{folder: "Inbox", unreaded: 1, UIDs: Array(1)}]
 *  currentFoldersData - state slise state.App.folders converted to js
 *  lodaedEmails - state slise state.App.emails converted to js
 * findDifference func compare received and current data and do:
 * 1. if some folder not in our folders then add it
 * 2. if folder exist and new firstShownUID > old firstShownUID add it for update (new email)
 * 3. removing non existing folders from current
 *
 * it return list of objects with foders info wich need to be updated [{folder:'Inbox', action:'update'}]
*/

export function findDifference(newFoldersData, currentFoldersData) {
  const foldersToUpdate = [];
  const allNewFolders = [];

  newFoldersData.map(folder => {
    allNewFolders.push(folder.folder);
    if (currentFoldersData[folder.folder] === undefined) {
      // adding new folders to our state email-list
      foldersToUpdate.push({
        action: 'add',
        folder: folder.folder,
        props: {
          default: false,
          unreaded: folder.unreaded,
          UIDs: folder.UIDs,
        },
      });
    } else {
      const currentUIDs = currentFoldersData[folder.folder].UIDs;
      if (
        !isEqual(folder.UIDs, currentUIDs) ||
        folder.unreaded !== currentFoldersData[folder.folder].unreaded
      ) {
        // updating info for existing folders
        foldersToUpdate.push({
          action: 'update',
          unreaded: folder.unreaded,
          folder: folder.folder,
        });
      }
    }
    return folder;
  });

  // removing non existing folders from store
  for (const folder in currentFoldersData) {
    if (
      !(allNewFolders.indexOf(folder) !== -1) &&
      !currentFoldersData[folder].default
    )
      foldersToUpdate.push({ action: 'delete', folder });
  }

  return foldersToUpdate;
}

export function lastShownUID(loadedUIDs, allUIDs = []) {
  if (loadedUIDs.length > 0) return Math.min(...loadedUIDs);
  if (allUIDs.length > 0) return Math.max(...allUIDs);
  return 0;
}

export function firstShownUID(loadedUIDs, allUIDs = []) {
  if (loadedUIDs.length > 0) return Math.max(...loadedUIDs);
  if (allUIDs.length > 0) return Math.max(...allUIDs);
  return 0;
}

export const getUIDlist = emailList => emailList.map(email => email.emailId);
export const getMessageIDList = emailList =>
  emailList.map(email => email.MessageID);

export function getUserFolders(allFolders) {
  const subFolders = [];
  for (const folder in allFolders) {
    if (!allFolders[folder].default)
      subFolders.push({
        folder,
        unreaded: allFolders[folder].unreaded,
      });
  }
  return subFolders;
}

export function getLastShownUID(emails, allUIDs = []) {
  const currentUIDs = getUIDlist(emails);
  if (currentUIDs.length > 0) {
    return Math.min(...currentUIDs);
  }
  if (allUIDs.length > 0) {
    return Math.max(...allUIDs);
  }
  return 0;
}

export function getFirstShownUID(emails, allUIDs = []) {
  const currentUIDs = getUIDlist(emails);
  if (currentUIDs.length > 0) {
    return Math.max(...currentUIDs);
  }
  if (allUIDs.length > 0) {
    return Math.max(...allUIDs);
  }
  return 0;
}

// function to endode non ascii folder names into ascii
export function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(`0x${p1}`),
    ),
  );
}

export function updateEmailObj(updatedObjProps, currentEmailObj) {
  if (updatedObjProps.attachments !== undefined) {
    const oldAttachListNames = [];
    const oldAttachList = [];
    for (const file of currentEmailObj.attachments) {
      oldAttachListNames.push(file.name);
      oldAttachList.push(file);
    }

    let isNewFileAdded = true;

    if (updatedObjProps.attachments.length === 0) isNewFileAdded = false;

    for (const file of updatedObjProps.attachments) {
      if (oldAttachListNames.indexOf(file.name) !== -1) {
        continue;
      } else {
        oldAttachList.push(file);
      }
    }

    if (isNewFileAdded) {
      updatedObjProps.attachments = oldAttachList;
    }
  }
  if (updatedObjProps.delete !== undefined) {
    let attachments = currentEmailObj.attachments.slice();
    for (let i in attachments) {
      if (attachments[i].name === updatedObjProps.delete) {
        attachments.splice(i, 1);
        break;
      }
    }
    currentEmailObj.attachments = attachments;
  }
  return { ...currentEmailObj, ...updatedObjProps };
}

export function saveDraft(
  emailType,
  currentEmailObj,
  updatedEmailObj,
  dispatch,
) {
  const prevBody = currentEmailObj.body;
  const prevSubject = currentEmailObj.subject;
  if (
    (updatedEmailObj.body !== undefined &&
      updatedEmailObj.body !== '<p><br></p>' &&
      updatedEmailObj.body !== prevBody) ||
    (updatedEmailObj.subject !== undefined &&
      updatedEmailObj.subject !== prevSubject)
  ) {
    dispatch(isSaveIndVisible(emailType, false));
    dispatch(saveDraftAtServerDebounce(updatedEmailObj, emailType));
  } else if (
    updatedEmailObj.attachments !== undefined ||
    updatedEmailObj.to !== undefined ||
    updatedEmailObj.cc !== undefined
  ) {
    dispatch(saveDraftAtServer(updatedEmailObj, emailType));
  }
}

export function createMsg(emailObj) {
  const message = new FormData();
  const DataToSend = { ...emailObj };
  const attachments = [];

  // below we seporate links to files (possible in reply messages),
  // from really attached files
  for (const attachment of DataToSend.attachments) {
    if ('file' in attachment) {
      message.append('docs', attachment.file);
    } else {
      attachments.push(attachment);
    }
  }

  DataToSend.attachments = attachments;
  message.append('textData', JSON.stringify(DataToSend));
  return message;
}

export function isAllRecipientsValid(email) {
  const persons = [...email.to, ...email.cc];
  let isAllEmailValid = true;
  if (!persons.length) return 'no recipient';

  for (let person of persons) {
    if (!EmailValidation(person.email)) {
      isAllEmailValid = false;
      break;
    }
  }

  if (isAllEmailValid) return 'OK';
  return 'invalid email';
}
