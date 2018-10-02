import React from 'react'

export default function SendButton (props) {
  function handleSendClick() {
    props.onSendClick()
  }

  if (props.screnType !== 'desktop') {
    return (
      <span className='my-cursor-pointer'
        data-toggle='tooltip'
        data-placement='top'
        title='Send email'
        onClick={(e) => handleSendClick(e)} >
        <i className='m-1 material-icons text-black-50 my-line-align-down'>
          send
        </i>
      </span>
    )
  }
  
  return (
    <button type='button' className='btn my-send-button' onClick={(e) => handleSendClick(e)}>
      Send
    </button>
  )
}
