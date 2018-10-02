import {getFirstShownUID} from '../containers/ShownUIDs'

function findDifference (newData, component) {
  var foldersToUpdate = []
  
  component.setState(prevState => {
    var allNewFolders = []
    
    for (let folder of newData) {
      allNewFolders.push(folder.folder)

      if ( !(folder.folder in prevState.emailList)) {
        //adding new folders to our state email-list
        prevState.emailList[folder.folder] = {emails:[], default: false, unreaded: folder.unreaded, UIDs: folder.UIDs}
        foldersToUpdate.push({folder: folder.folder, stepsBack: prevState.emailBatchToUpload, unreaded: folder.unreaded})

      } else if (getFirstShownUID(prevState.emailList[folder.folder].emails, prevState.emailList[folder.folder].UIDs) < Math.max(...folder.UIDs) ) {
        //updating info on existing folders
        console.log(`${folder.folder} FirstShownUID: ${getFirstShownUID(prevState.emailList[folder.folder].emails, prevState.emailList[folder.folder].UIDs)}, last UID: ${Math.max(...folder.UIDs)}`)
        foldersToUpdate.push({folder: folder.folder, stepsBack: 0, unreaded: folder.unreaded})
      }

      prevState.emailList[folder.folder].unreaded = folder.unreaded
      prevState.emailList[folder.folder].UIDs = folder.UIDs    
    }
    
    //removing non existing folders
    for (let folder in prevState.emailList){
      if ( !(allNewFolders.includes( folder )) && !prevState.emailList[folder].default) {
        delete prevState.emailList[folder]
      }
    }

    return prevState
  })

  return foldersToUpdate
}

export default findDifference