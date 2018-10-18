import React from 'react'
import {Link} from 'react-router-dom'

export function Draft (props) {
  function handleClick (folder, event) {
    //event.preventDefault()
    props.onFolderChange(folder)
  }

  const isActive = props.folder === 'Draft' ? 'isActive' : ''

  return (
    <li className={`draftItem ${isActive}`}>
      <Link to='/draft' onClick={(e) => handleClick('Draft', e)}>Draft</Link>
    </li>
  )
}

export function Sent (props) {
  function handleClick (folder, event) {
    //event.preventDefault()
    props.onFolderChange(folder)
  }

  const isActive = props.folder === 'Sent' ? 'isActive' : ''

  return (
    <li className={`sentItem ${isActive}`}>
      <Link to='/sent' onClick={(e) => handleClick('Sent', e)}>Sent</Link>
    </li>
  )
}



