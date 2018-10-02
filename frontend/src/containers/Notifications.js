import React from 'react'

export default function Notifications (props) {
  const visibility = props.notification.isVisible ? '' : 'd-none'
  return (
    <div className={`my-notification ${visibility}`}>
      <span className='my-font-size-md'>{props.notification.body}</span>
    </div>
  )
}
