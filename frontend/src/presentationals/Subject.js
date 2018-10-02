import React from 'react'

export default function Subject (props) {
  const subjText = props.view === 'full' ? 'Subject: ' : ''
  return (
    <div className={`${props.className} my-font-size-md shorten-text mt-1 `}>
      <span className='text-black-50'>{subjText}</span>{props.emailInfo.subject}
    </div>
  )
}
