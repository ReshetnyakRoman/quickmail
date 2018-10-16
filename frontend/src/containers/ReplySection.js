import React from 'react'
import EmailOutTitle from '../containers/EmailOutTitle'
//import MyEditor from '../containers/MyEditor'
import EmailOutFooter from '../containers/EmailOutFooter'
import SendToInput from '../containers/SendToInput'
import AttachedDocs from '../presentationals/AttachedDocs'
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

class ReplySection extends React.Component {

  handleReplyEmailObj(emailDataKey, value) {
    if(value === undefined){
      this.props.onEmailDataChange(emailDataKey)
    }else {
      this.props.onEmailDataChange({[emailDataKey]: value})
    }
  }

  handleSendClick(emailType){
    this.props.onSendClick('ReplyEmail')
  }


  handleDeleteDraftClick (status) {
    this.props.onDeleteDraftClick('ReplyEmail')
  }
  render () {
    const props = this.props
    const { connectDropTarget, isOver, canDrop } = props
    const focus = props.replyEmailStatus !== 'forward' ? true : false
    const config = {
      //replyType: [to, cc, pre fix]
      reply:[[this.props.emailInfo.from],[],'Reply:'],
      replyAll:[[this.props.emailInfo.from], this.props.emailInfo.cc,'Reply:'],
      forward:[[],[],'Forward:']
    }
    

    return (
      <div className='reply-section pb-1 d-flex flex-column'>
        <EmailOutTitle 
          screnType={props.screnType} 
          type='reply'
          onSendClick = {(e)=> this.handleSendClick(e)}
          onEmailDataChange={(files) => this.handleReplyEmailObj('attachments',files)} 
          onDeleteDraftClick={(e) => this.handleDeleteDraftClick(e)}/>
        <SendToInput
          toogleChange = {props.replyEmailStatus}
          onInputChange = {(recipients) => this.handleReplyEmailObj('to',recipients)}
          recipentsList={config[props.replyEmailStatus][0]}
          isChangable = {true}
          prefix = {config[props.replyEmailStatus][2]}
          isUnderlined = {false}
          className='responsive-margin-x responsive-margin-t mb-1' />
        <SendToInput
          onInputChange = {(recipients) => this.handleReplyEmailObj('cc',recipients)}
          recipentsList = {config[props.replyEmailStatus][1]}
          isChangable = {true}
          prefix = {'Copy:'}
          isUnderlined = {false}
          className='responsive-margin-x my-1' />
        {connectDropTarget(
          <div style = {{position:'relative'}}>
            {isOver && <div className='dropZone'>Drop files here</div>}
            <MyEditorLoadable 
            replyType = {props.replyEmailStatus}
            emailInfo = {props.emailInfo}
            onContentChange = {(content) => this.handleReplyEmailObj('body',content)}
            className = 'responsive-margin-x responsive-margin-y' 
            inFocus = {focus} />
          </div>
        )}  
        
        <AttachedDocs attachments = {props.attachments} onEmailDataChange = {(e)=> this.handleReplyEmailObj(e)}/> 
        <EmailOutFooter 
          isSavedIndVisible = {props.isSavedIndVisible}
          onSendClick = {(e)=> this.handleSendClick(e)}
          onEmailDataChange = {(e) => this.handleReplyEmailObj(e)}
          screnType={props.screnType} 
          onDeleteDraftClick = {(e) => this.handleDeleteDraftClick(e)}/>
      </div>
    )
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(ReplySection);
