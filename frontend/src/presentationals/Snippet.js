import React from 'react'

export default function Snippet (props) {
  return (
    <div className='my-font-size-md text-black-50  font-weight-light shorten-text'>
      {props.emailInfo.snippet}
    </div>
  )
}
