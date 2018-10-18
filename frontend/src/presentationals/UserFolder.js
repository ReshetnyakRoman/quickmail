import React from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import Types from '../containers/ItemType'
import {Link} from 'react-router-dom'

const targetSubFolder = {
  drop(props,monitor,component){
  	//if component dropped on itsefl do nothing
    if(!component){
    	return
    }
    const hasDroppedOnChild = monitor.didDrop()
    //if component dropped on child, do nothing
    if(hasDroppedOnChild){
    	return
    }

    return props.userFolder

  },
}

function collect (connect,monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  }
}

class UserFolder extends React.Component {
	handleClick (folder,event) {
		//event.preventDefault()
		this.props.onUserFolderClick(folder,event)
	}

	handleDeleteFolderClick (userFolder) {
		this.props.onDeleteFolderClick(userFolder)
	}

	render () {
		const {
			isActive,
			userFolder,
			isOver,
			isOverCurrent,
			connectDropTarget
		} = this.props

		return (connectDropTarget && connectDropTarget(
      <li key={userFolder.folder} className={`${isActive} inbox`}>
      	{isOverCurrent && <div className={'onDrugHoverSub'} />}
        <Link to={`/${userFolder.folder}`} 
          className={'user-folder'}
          onClick={(e) => this.handleClick(userFolder.folder, e)}>
          {decodeURI(userFolder.folder)}&nbsp;{ userFolder.unreaded ? `(${userFolder.unreaded})` : ''}
          
        </Link>
        <i className='material-icons delete-folder my-cursor-pointer' 
          //style={{fontSize:'16px', position:'absolute',top:'6px',marginLeft:'10px'}}
          onClick={(e) => this.handleDeleteFolderClick(userFolder.folder)}>
          delete_forever
        </i>
      </li>
    ))
	}
}

export default DropTarget(Types.email, targetSubFolder, collect)(UserFolder)