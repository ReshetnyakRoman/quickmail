import React from 'react'

export default function CloseEmail (props) {
  function handleClick (e) {
    e.preventDefault()
    props.onCloseClick('closed')
  }

  return (
    <span className='my-cursor-pointer deleteDraft'
      data-toggle='tooltip'
      data-placement='top'
      title='close'
      onClick={(e) => handleClick(e)}>

      <i className='material-icons text-black-50 my-line-align-down'>
        close
      </i>

    </span>
  )
}
