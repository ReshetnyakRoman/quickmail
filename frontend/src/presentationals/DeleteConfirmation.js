import React from 'react'

export default function DeleteConfirmation (props) {

  return (
    <div className='my-modal-backdraw-white'>
      <div className='my-addFolder'>
        <span
          onClick={(e) => props.onCloseClick(false)}
          className='my-display-topright px-2 py-1 my-font-size-lg my-hover-dark my-cursor-pointer'>
          &times;
        </span>
        <p className='text-black-50' style={{padding:'10px 0px', textAlign: 'center'}}>{`Delete folder ${props.folder}?`}</p>
        <div className='text-center'>
          <button
            className='btn my-btn-danger'
            onClick={(e) => props.onConfirmDeleteClick(props.folder)}>Delete</button>
        </div>
      </div>
    </div>
  )
}
