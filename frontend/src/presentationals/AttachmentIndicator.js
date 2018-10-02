import React from 'react'

export default function AttachmentIndicator (props) {
  const visibility = props.emailInfo.attachments.length ? '' : 'd-none'
  return (
    <div className={`${props.className} attachments-ind ${visibility}`}>
      <i className='material-icons my-font-size-lg'>attachment</i>
    </div>
  )
}
