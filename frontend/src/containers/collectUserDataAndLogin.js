import serverURL from '../config'

async function collectUserDataAndLogin(response, loginType, accessToken, app){
  if (response && !response.error) {
    app.props.onLoadingComplete(false)
    console.log(`Recieved user-data from ${loginType}`)
    
    var userData = {
      name: loginType==='FB' ? response.name : response.response[0].first_name+' '+response.response[0].last_name,
      ID: loginType==='FB' ? response.id.toString() : response.response[0].uid.toString(),
      pic: loginType==='FB' ? response.picture.data.url : response.response[0].photo_200,
      loginType: loginType,
      accessToken: accessToken,
      lastUID:0,
      UIDs:[]
      } 
    //console.log(JSON.stringify(userData))
    var foldersWithInfo
    fetch(`${serverURL}/auth`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        })
    .then(res=>res.json())
    .then(console.log('Recieved user-data from QM-server'))
    .then(res=>{
      userData.email = res.email
      userData.accessToken = res.accessToken
      foldersWithInfo = res.foldersWithInfo
      return res
    })
    .then((res)=>{
      let isLogin = true
      if(!res.success){
        userData = {email:'unknown', name:'unknown', ID:'', loginType:'', accessToken:''}
        isLogin = false
        alert(res)
      }
      
      app.props.handleFoldersInfo(foldersWithInfo)
      app.props.handleCurrentUserData(userData)
      app.props.handleLoggedInState(isLogin)
      app.props.onLoadingComplete(true)
    })
    .catch(err => console.log(err))
     
    } else {
        alert('Problem with server connection')
        console.log(response.error)
      }
}

export default collectUserDataAndLogin