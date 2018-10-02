import React from 'react'
import Avatar from '../presentationals/Avatar'
import MailFrom from '../presentationals/MailFrom'
import Subject from '../presentationals/Subject'
import Snippet from '../presentationals/Snippet'
import AttachmentIndicator from '../presentationals/AttachmentIndicator'
import ReceivingDate from '../presentationals/ReceivingDate'
import EmailControls from '../containers/EmailControls'
import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd'
import Types from '../containers/ItemType'
//import { getEmptyImage } from 'react-dnd-html5-backend'

const emailSource = {
  beginDrag (props, monitor, component){
    const item = { id: props.emailInfo.emailId }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    const folder = dropResult.folder
    component.onDrop(item.id, folder)
    //alert(`Email with id: ${item.id} moved to "${folder}"`)
  }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),

  }
}

class EmailListItem extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }
  /*
  componentDidMount () {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      })

    }
  }*/
  onDrop(uid, folder){
    this.props.onFolderMove(uid, folder)
  }

  handleClick(e){
    this.props.onEmailClick()
  }
  
  render(){
    const { isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0 : 1
    return (
      <React.Fragment>
       
          <div className={`d-flex emailListItem mb-2`} style={{opacity:opacity }}>
           {connectDragSource(
              <div className={`d-flex full-width`}>
                <Avatar 
                  user = {this.props.emailInfo} 
                  type = 'square' 
                  onAvatarClick = {(e) => this.handleClick(e)}
                  className = 'my-cursor-grab'/>
                <div className='d-flex flex-column emailInfo pl-2 py-2' onClick={(e) => this.handleClick(e)}>
                  <MailFrom emailInfo={this.props.emailInfo} view='short' status={this.props.emailInfo.isUnreaded} />
                  <Subject emailInfo={this.props.emailInfo} view='short' />
                  <Snippet emailInfo={this.props.emailInfo} view='short' />
                </div>
                <div className='d-flex flex-column emailListItem-border-right my-flex-align-center'>
                  <AttachmentIndicator emailInfo={this.props.emailInfo} className='pt-1' />
                  <ReceivingDate emailInfo={this.props.emailInfo} view='short' className='align-self-stretch' />
                </div>
              </div>
            )}
            <EmailControls view='short' folder={this.props.folder} status={this.props.emailInfo.isUnreaded} emailId={this.props.emailInfo.emailId}/>
          </div>
        
        
      </React.Fragment>
    )
  }
}


export default DragSource(Types.email, emailSource, collect)(EmailListItem)