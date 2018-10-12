import fetchWithTimeOut from '../containers/fetchWithTimeOut'
import serverURL from '../config'
import authorizedHeader from '../containers/authorizedHeader'

export default async function getEmail(uid, component, silent=true) { 
		console.log(`Start getting email uid: ${uid}`)
		let getEmailLoadingTimer = setTimeout(() => component.setState({isLoading: !silent}), 500)
    
    const folder = component.state.currentFolder
    const url = new URL(`${serverURL}/${folder}/${uid}?keepUnseen=${silent}`)
    const config = {method: 'GET', headers: authorizedHeader(component)}
    const timeout =  component.state.warningTimeout
    var email

  	await fetchWithTimeOut(url, config, timeout)
    .then(res => res.json())
    .then(
    	res => {
	    	if (res.success) {
	    		email = res.email
	    		component.setState(prevState =>{
	    			if (!(folder in prevState.receivedEmails)) prevState.receivedEmails[folder] = []
	    			prevState.receivedEmails[folder].push(res.email)	    			
	    			return prevState
	    		})
	    	} else {
	    		component.setState({contentBoxMessage: res.message})
	    	}
	    }, 
    err => component.setState({contentBoxMessage: "Oops, can't get this email from server.", isLoading: false}))
    .then(()=>console.log(`Email UID ${uid} downloaded`))
    .then(() => clearTimeout(getEmailLoadingTimer))
    
    
    
    return email
  }