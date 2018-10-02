import authorizedHeader from '../containers/authorizedHeader'
import serverURL from '../config'

export default function markUnread (component, status, uid) {
	const folder = component.state.currentFolder
  const url = new URL(`${serverURL}/${folder}/${uid}?markUnread=${!status}`)
  const action = status ? -1 : 1

  component.setState(prevState => {
    prevState.emailList[folder].emails.map(email => {if (email.emailId === uid) email.isUnreaded = !status} )
    prevState.emailList[folder].unreaded += action
    return  {emailList: prevState.emailList}
  })

  fetch(url, {method: 'PATCH', headers: authorizedHeader(component)})
  .then(res => res.json())
  .then(
    res => res.success ? console.log('Email status changed') : console.log(res.message),
    err => console.log('Cant change email status, try again later'))
}