import collectUserDataAndLogin from '../containers/collectUserDataAndLogin'

async function handleLoginResponse(response,social, accessToken,app) {
  if(response.status === 'connected'){
    if(social==='VK'){
    	//requesting user info from social api
      window.VK.api("users.get", {fields:'photo_200,first_name,last_name,uid',version:5.8},
      (res)=>collectUserDataAndLogin(res, social, accessToken, app) )
    } else {
    	//requesting user info from social api
      window.FB.api(`/me`,'GET', {fields: 'name,id,picture.width(200).height(200)'}, 
        (res)=>collectUserDataAndLogin(res, social, accessToken, app) )
    } 
    
  } else {
    app.props.handleLoggedInState(false, {email:'', name:'', ID:'', pic:'', loginType:''} )
  }
}

export default handleLoginResponse 