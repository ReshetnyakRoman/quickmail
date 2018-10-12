import React from 'react'
import UserFolder from '../presentationals/UserFolder'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import Types from '../containers/ItemType'

const targetFolder = {
  drop (props,monitor,component){
  	//if component dropped on itsefl do nothing
    if(!component){
    	return
    }
    const hasDroppedOnChild = monitor.didDrop()
    //if component dropped on child, do nothing
    if(hasDroppedOnChild){
    	return
    }

    return {folder:'Inbox'}

  },

  hover (props, monitor, component) {
  	if( monitor.isOver({ shallow: true }) ){
  		component.handleInboxToogle(true)
  	}
  }
}

function collect (connect,monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  }
}

class Inbox extends React.Component{	
  handleClick (folder, event) {
    if(event) {event.preventDefault()}
    this.props.onFolderChange(folder)
  }

  handleAddFolderClick (event) {
    //event.preventDefault()
    this.props.onAddFolderClick(true)
  }

  handleDeleteFolderClick(folder,event) {
    this.props.onDeleteFolderClick(folder)
  }

  handleInboxToogle (status) {
    this.props.onInboxCollapseClick(status)
  }

  render() {
  	const defaultFolders = ['Trash','Sent','Draft']
	  const {
	  	isInboxOpen, 
	  	userFolders, 
	  	currentFolder, 
	  	isOver, 
	  	isOverCurrent,
	  	connectDropTarget,
	  	inboxUnreaded
	  } = this.props
	  const isActive =  !defaultFolders.indexOf(currentFolder) !== -1 ? 'isActive' : ''
	  
	  
	  const InboxFolder = 
	    <a href='Inbox' onClick={(e) => this.handleClick('Inbox', e)}>
	      Inbox { inboxUnreaded ? `(${inboxUnreaded})` : ''}
	    </a>
	  
	  const toogleCollapseIcon = 
	    <a href='#' className='my-cursor-pointer' onClick = {e => this.handleInboxToogle(!this.props.isInboxOpen)}>
	      <i className='material-icons ml-2' style={{verticalAlign:'-7px'}}>
	      	{isInboxOpen ? 'arrow_drop_down' : 'arrow_right'}
	      </i>
	    </a>

	  const folders = userFolders.map(
	    function (userFolder) {
	      const isActive = currentFolder === userFolder.folder ? 'isActive' : ''
	      
	      return (
	        <UserFolder 
	        	key = {userFolder.folder}
	        	userFolder = {userFolder} 
	        	isActive = {isActive} 
	        	unreaded = {userFolder.unreaded}
	        	onDeleteFolderClick={(e) => this.handleDeleteFolderClick(e)}
	        	onUserFolderClick={(e) => this.handleClick(e)}/>
	      )
	    },this)

	  const addNewFolder =  
	    <li className='pb-2' key='newfolder'>
	      <a className='small my-text-blue my-cursor-pointer' onClick={(e) => this.handleAddFolderClick(e)}>
	        <i style = {{
		        	verticalAlign:' -6px',
							lineHeight: '16px',
							fontSize:' 20px'
						}}
	        	className='material-icons'>add_box
	        </i>
	        &nbsp;new folder
	      </a>
	    </li>

	  const inboxSubFolders = 
	    <ul className={`inner-list ${isInboxOpen ? '' : 'collapse'} inbox-collapse`} >
	      {addNewFolder}
	      {folders}
	    </ul>

	  return (connectDropTarget && connectDropTarget(
		    <li className={`inboxItem ${isActive}`}>
		    	{isOverCurrent && <div className={'onDrugHover'} style={{top:'8px'}}/>}
		      {InboxFolder}
		      {toogleCollapseIcon}
		      {inboxSubFolders}
		    </li>
	    )
	  )
	}
}

export default DropTarget(Types.email, targetFolder, collect)(Inbox)
