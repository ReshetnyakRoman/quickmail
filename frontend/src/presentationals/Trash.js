import React from 'react'
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import Types from '../containers/ItemType'
import {Link} from 'react-router-dom'

const targetFolder = {
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

    return {folder:'Trash'}

  },
}

function collect (connect,monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  }
}

class Trash extends React.Component {
  handleClick (folder, event) {
    //event.preventDefault()
    this.props.onFolderChange(folder)
  }

  render() {
    const {
      isOver, 
      isOverCurrent,
      connectDropTarget
    } = this.props
    const isActive = this.props.folder === 'Trash' ? 'isActive' : ''

    return (connectDropTarget && connectDropTarget(
      <li className={`trashItem ${isActive}`}>
        {isOverCurrent && <div className={'onDrugHover'} style={{top:'8px'}}/>}
        <Link to='/trash' onClick={(e) => this.handleClick('Trash', e)}>Trash</Link>
      </li>
    ))
  }
}

export default DropTarget(Types.email, targetFolder, collect)(Trash)