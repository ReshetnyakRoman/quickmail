import React from 'react'
 
export default function MailFrom (props) {
  const name = props.emailInfo.from.name ? props.emailInfo.from.name : props.emailInfo.from.email
  const isUnreaded = props.status ? '' : 'd-none'
  const showElem = ['d-none', '']
  const isFull = props.view === 'full' ? 1 : 0

  const fontWeight = ['font-weight-bold', '']
  return (
    <div className='mailFrom-block position-static mb-1 my-cursor-menu'>
      <div className={`${fontWeight[isFull]} ${props.className} my-font-size-md shorten-text`}>
        <i className={`material-icons my-font-size-md mr-1 my-text-blue ${isUnreaded} ${showElem[!isFull]}`}>
        fiber_manual_record
        </i>
        <span className={`text-black-50 ${showElem[isFull]}`}>From: </span>
        <span >{name}</span>
      </div>
      <div className='mailFrom-popup small text-black-50 my-cursor-text'>
        e-mail:&nbsp;<span className='my-text-blue'>{props.emailInfo.from.email}</span>
      </div>
    </div>
  )
}
