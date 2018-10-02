import React from 'react'

export function Draft (props) {
  function handleClick (folder, event) {
    event.preventDefault()
    props.onFolderChange(folder)
  }

  const isActive = props.folder === 'Draft' ? 'isActive' : ''

  return (
    <li className={`draftItem ${isActive}`}>
      <a href='Draft' onClick={(e) => handleClick('Draft', e)}>Draft</a>
    </li>
  )
}

export function Sent (props) {
  function handleClick (folder, event) {
    event.preventDefault()
    props.onFolderChange(folder)
  }

  const isActive = props.folder === 'Sent' ? 'isActive' : ''

  return (
    <li className={`sentItem ${isActive}`}>
      <a href='Sent' onClick={(e) => handleClick('Sent', e)}>Sent</a>
    </li>
  )
}



