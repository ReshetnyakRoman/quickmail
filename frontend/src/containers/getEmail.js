import fetchWithTimeOut from '../containers/fetchWithTimeOut'
import serverURL from '../config'
import authorizedHeader from '../containers/authorizedHeader'

export default async function getEmail(component,uid, folderName) { 
  console.log(`Start getting email uid: ${uid}`)
  component.getEmailStatus = 'inprocess'
  const url = new URL(`${serverURL}/${folderName}/`)
  var params = {
    stepsBack: 1, 
    lastShownEmail: uid+1
  }
  url.search = new URLSearchParams(params)
  const config = {method: 'GET', headers: authorizedHeader(component)}


  let result = await fetchWithTimeOut(url, config, 45000)
      .then(res => res.json())
      .then(
    	res => {
        	if (res.success) {
                if(res.emailList[0].emailId === uid){
                    component.getEmailStatus = 'success'
                    component.setState({
                        currentFolder:folderName,
                        ContentBoxStatus: 'EmailIn',
                        OpenEmailInData: res.emailList[0],
                        OpenEmailInId:res.emailList[0].emailId
                    })
                    console.log(`Email UID ${uid} downloaded`)
                }else {
                    component.getEmailStatus = 'error'
                    console.log(`No uid ${uid} in ${folderName}`)
                }
        		
        	} else {
                component.getEmailStatus = 'error'
        		console.log(res.message)
        	}
        }, 
      err => {
        console.log(`Cant get uid:${uid} from ${folderName}`)
        component.getEmailStatus = 'error'
      })

    return true
  } 