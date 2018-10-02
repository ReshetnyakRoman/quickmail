import React from 'react'

export default function NewMailButton (props) {
  function handleClick () {
    props.onNewEmailClick('open')
  }

  return (
    <React.Fragment>
      <span
        className={`btn my-btn-primay my-4 mx-auto my-hide-mobile ${props.className}`}
        onClick={(e) => handleClick()}
        alt='wright new email'>
        New email
      </span>
      <span className='new-email-btn-small' onClick={(e) => handleClick()}>
        <i className='material-icons'>create</i>
      </span>
    </React.Fragment>
  )
}
