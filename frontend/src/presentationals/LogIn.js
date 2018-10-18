import React from 'react'
import connectedToSocials from '../containers/connectedToSocials'
import withLoginToSocials from '../containers/withLoginToSocials'
import {Link} from 'react-router-dom'

function LogIn (props) {
    return (
      <div className='login'>
        <div className='gradient' />
        <div className='login-inner'>
          <div className='login-content'>
            <p className='pb-5'>
              <span>
                <span className='welcometext'>Welcome to</span> <br />
                <span className='logo'>
                  <span className='logo-red'>Q</span>uick<span className='logo-blue'>M</span>ail
                </span>
              </span>

            </p>
{/*            <button className='btn-fb' onClick={()=>props.login('FB')} data-scope="public_profile">
              Login with
              <img alt='facebook logo' src='./img/facebook-logo.png' />
            </button>
            <hr className='log-in-hr' />*/}
            <Link to='/inbox' className='LinkToDefaults'>
              <button className='btn-vk' onClick={()=>props.login('VK')}>
                  Login with
                  <img alt='vk-logo' src='./img/vk-logo.svg' />
              </button>
            </Link>
            <div className='about-block position-relative'>About project
              <div className='about-popup'>"QuickMail" is one more mail-service for you!
              <ul className=''>
              <li>It's free</li>
              <li>No registration, simply login with your socials</li>
              <li>Clean & Simple Descktop and Mobile interface</li>

            </ul>

            </div>
   
            </div>
          </div>
        </div>

      </div>
    )
}

const LogInConnectedToSocials = withLoginToSocials(connectedToSocials(LogIn))
export default LogInConnectedToSocials