import React from 'react'
import {Sent,Draft} from '../containers/Folders'
import Inbox from '../containers/Inbox'
import Trash from '../presentationals/Trash'

export default function SideBarMenu (props) {
  function handleCurrentFolder (folder) {
    props.onFolderChange(folder)
  }

  function handleAddFolderClick (status) {
    props.onAddFolderClick(status)
  }

  function handleDeleteFolderClick (folder) {
    props.onDeleteFolderClick(folder)
  }

  function handleInboxToogle(status) {
    props.onInboxCollapseClick(status)
  }

  return (
    <div className='sidebar-menu'>
      <ul>
        <Inbox
          inboxUnreaded = {props.inboxUnreaded}
          currentFolder = {props.currentFolder}
          userFolders = {props.userFolders}
          isInboxOpen = {props.isInboxOpen}
          onDeleteFolderClick = {(folder) => handleDeleteFolderClick(folder)} 
          onFolderChange = {(folder) => handleCurrentFolder(folder)}
          onInboxCollapseClick = {(status) => handleInboxToogle(status)}
          onAddFolderClick = {(e) => handleAddFolderClick(e)} />
        <Draft
          folder = {props.currentFolder}
          onFolderChange = {(folder) => handleCurrentFolder(folder)} />
        <Sent
          folder={props.currentFolder}
          onFolderChange = {(folder) => handleCurrentFolder(folder)} />
        <Trash
          folder={props.currentFolder}
          onFolderChange = {(folder) => handleCurrentFolder(folder)} />
      </ul>
    </div>
  )
}


