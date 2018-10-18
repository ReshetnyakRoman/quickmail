import React from 'react'
import {Link} from 'react-router-dom'

export default function AccountInfo (props) {
  
  function logout () {
    if(props.user.loginType === 'FB'){
      window.FB.logout((response)=>{
        props.onExitClick(false)
        console.log('Logged out from Facebook and QuickMail')
      })
    } else {
      window.VK.Auth.logout((response)=>{
        props.onExitClick(false)
        console.log('Logged out from VK and QuickMail')
      })
    }
  }    

    return (
      <div className='my-account-info'>
        <div className='triangle' />
        <div className='my-account-info-settings'>
          <div className='account-text' style={{paddingBottom:0, marginBottom:0}}>{props.user.name}</div>
          <div className='account-text'>{props.user.email}</div>
          <div className='opt'>
            <Link to='/welcome' className='LinkToDefaults'>
              <span className='opt-item isAccount' onClick={()=>logout()} alt='wright new email'>
                Exit
              </span>
            </Link>
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
