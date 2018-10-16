import React from 'react'
//import MyEditor from '../containers/MyEditor'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import { MyEditorLoadable } from '../App'


const fileTarget = {
	drop(props, monitor){
		const files = monitor.getItem().files
		const filesWithInfo = Array.from(files).map( file => ({
      name:file.name, size:file.size, file:file}
      ))
		props.onEmailDataChange({'attachments':filesWithInfo})
	}
}

class EmailOutBody extends React.Component {

	handleNewEmailObj (body,content) {
		this.props.onEmailDataChange({[body]:content}) 
	}

  
  render () {
  	const { connectDropTarget, isOver, canDrop, emailInfo } = this.props

	  return connectDropTarget(
	    <div className='email-body'>
	    	{isOver && <div className='dropZone'>Drop files here</div>}
	      <MyEditorLoadable 
	      	replyType = {'new'}
          emailInfo = {emailInfo}
	      	onContentChange={(content)=>this.handleNewEmailObj('body', content) }/>
	    </div>
	  )
  }
}
export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(EmailOutBody);