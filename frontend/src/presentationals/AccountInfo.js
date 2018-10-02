import React from 'react'

export default function AccountInfo (props) {
  
  function logout () {
    if(props.user.loginType === 'FB'){
      window.FB.logout((response)=>{
        props.onExitClick(false, {email:'', name:'', fbId:'', pic:'' })
        console.log('Logged out from Facebook and QuickMail')
      })
    } else {
      window.VK.Auth.logout((response)=>{
        props.onExitClick(false, {email:'', name:'', fbId:'', pic:'' })
        console.log('Logged out from VK and QuickMail')
      })
    }
    //console.log('Logged out from QuickMail')
    //this.props.onExitClick(false, {email:'', name:'', fbId:'', pic:'' })
  }    

    return (
      <div className='my-account-info'>
        <div className='triangle' />
        <div className='my-account-info-settings'>
          <div className='account-text' style={{paddingBottom:0, marginBottom:0}}>{props.user.name}</div>
          <div className='account-text'>{props.user.email}</div>
          <div className='opt'>
            <span className='opt-item isAccount' onClick={()=>logout()} alt='wright new email'>
              Exit
            </span>
            <div className='opt-item isSetting'>
              <svg>
                <circle cx='35%' cy='50%' r='2' />
                <circle cx='50%' cy='50%' r='2' />
                <circle cx='65%' cy='50%' r='2' />
              </svg>
            </div>
          </div>
        </div>
      </div>
  )  
}
