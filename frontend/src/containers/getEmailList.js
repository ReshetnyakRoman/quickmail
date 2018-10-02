import fetchWithWarningMessage from '../containers/fetchWithWarningMessage'
import serverURL from '../config'
import getUIDlist from '../containers/getUIDlist'
import authorizedHeader from '../containers/authorizedHeader'
import {getLastShownUID, getFirstShownUID} from '../containers/ShownUIDs'

export default async function getEmailList(component, folder=undefined, stepsBack = undefined, silent=false){
		stepsBack = stepsBack !== undefined ? stepsBack : component.state.emailBatchToUpload
    
    const timeout = component.state.warningTimeout
    const folderName = folder ? folder : component.state.currentFolder 
    const emailList = component.state.emailList[folderName]
    if (emailList.UIDs.length > 0 ){

      const url = new URL(`${serverURL}/${folderName}/`)
      var params = {
        stepsBack: stepsBack, 
        lastShownEmail: stepsBack ? getLastShownUID(emailList.emails, emailList.UIDs) : getFirstShownUID(emailList.emails, emailList.UIDs)
      }
      url.search = new URLSearchParams(params)
      const config = {method: 'GET', headers: authorizedHeader(component)}
      const warningMessage = 'Slow connection, you will see emails once loading compete'

      console.log(`Requesting ${folderName} emails list`)

      const fetchFunction = silent ? fetch : fetchWithWarningMessage

      await fetchFunction(url, config, warningMessage, timeout, component)
      .then(res => res.json())
      .then(res => {console.log(`${res.folder}'s emails list successfully received`) 
        return res
      })
      .then((res) => {
        if(res.success){
          
        component.setState(prevState => {
          var cleanedEmailList = []
          const newUIDlist = getUIDlist(res.emailList)
          const fullUIDlist =  res.UIDs
          for (let email of prevState.emailList[folderName].emails ) {
             //check that email not in Mailbox already and emails still exist in this folder
            if( !(newUIDlist.includes(email.emailId)) && fullUIDlist.includes(email.emailId) ){
              cleanedEmailList.push(email)
            }      
            
          }

          //adding new emails to current email list
          const updatedEmailList = cleanedEmailList.concat(res.emailList).sort(
            (a,b) =>  new Date(b.receivingDate) - new Date(a.receivingDate) 
            )

          prevState.emailList[folderName].emails = updatedEmailList
          prevState.contentBoxMessage = ''
          prevState.emailList[res.folder].UIDs = res.UIDs
          return prevState
        })
        
        } else {
          console.log(res.message)
        }
      })
      .catch(err => console.log(err))
    
    } 
    return true
  }