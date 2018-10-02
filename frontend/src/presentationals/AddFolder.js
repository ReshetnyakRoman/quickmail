import React from 'react'

export default function AddFolder (props) {
  let textInput = React.createRef()

  function handleCloseClick () {
    props.onCloseClick(false)
  }


  function handleCreateClick () {
    var folderName = encodeURI(textInput.current.value.replace(/[^0-9a-zA-ZА-Яа-я_\+\- ]/gi, ''))

    if(folderName) props.onCreateFolderClick(folderName)
    
    handleCloseClick()
  }

  function handleEnterKey(e) {
    if(e.key === 'Enter'){
      handleCreateClick(e)
    }

  }

  return (
    <div className='my-modal-backdraw-white'>
      <div className='my-addFolder'>
        <span
          onClick={(e) => handleCloseClick(e)}
          className='my-display-topright px-2 py-1 my-font-size-lg my-hover-dark my-cursor-pointer'>
          &times;
        </span>
        <input type='text'
          name='neaFolder'
          aria-label='new folder'
          maxlength='15'
          ref={textInput}
          className=''
          placeholder='Folder Name'
          onKeyUp={(e) => handleEnterKey(e)} />
        <div className='text-center'>
          <button
            className='btn my-btn-success'
            onClick={(e) => handleCreateClick(e)}>Create</button>
        </div>
      </div>
    </div>
  )
}
