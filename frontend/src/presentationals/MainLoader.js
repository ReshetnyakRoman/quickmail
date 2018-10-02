import React from 'react'
import connectedToSocials from '../containers/connectedToSocials'
import withLoginToSocials from '../containers/withLoginToSocials'

function MainLoader (props){
  return (
    <div className='main-loader flex-column'>
      <div className='loader-container '>
        <div className='envelope'>
          <div className='envelope-left' />
          <div className='envelope-right' />
        </div>
        <div className='envelope-content' />
        <div className='envelope-top' />
      </div>
      <div className='progress' style={{height: '2px'}}>
        <div className='progress-bar'
          role='progressbar'
          aria-valuenow='100'
          aria-valuemin='0'
          aria-valuemax='100' />
      </div>
    </div>
  )
}

const MainLoadeWithLoginCheck = withLoginToSocials(connectedToSocials(MainLoader))
export default MainLoadeWithLoginCheck
