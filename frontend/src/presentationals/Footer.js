import React from 'react'

export default function Footer (props) {
  function handleButtonClick (status, event) {
    props.onButtonClick(status, props.emailInfo)
  }

  return (
    <footer className='m-2 d-flex emailIn-footer'>
      <button type='button' className='btn my-btn-outline-dark' onClick={(e) => handleButtonClick('reply',  e)}>
        <i className='material-icons'>reply</i>
        <span className='align-top my-hide-mobile'>&nbsp;Reply</span>
      </button>
      <button type='button' className='btn my-btn-outline-dark' onClick={(e) => handleButtonClick('replyAll', e)}>
        <i className='material-icons'>reply_all</i>
        <span className='align-top my-hide-mobile'>&nbsp;Reply to all</span>
      </button>
      <button type='button' className='btn my-btn-outline-dark' onClick={(e) => handleButtonClick('forward', e)}>
        <i className='material-icons'>forward</i>
        <span className='align-top my-hide-mobile' >&nbsp;Forward</span>
      </button>
    </footer>
  )
}
