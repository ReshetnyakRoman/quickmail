import React from 'react'
import ScreenTypeContext from '../containers/Context'
import EmailOutHeader from '../containers/EmailOutHeader'
import EmailOutBody from '../containers/EmailOutBody'
import AttachedDocs from '../presentationals/AttachedDocs'
import EmailOutFooter from '../containers/EmailOutFooter'
import EmailOutStyle from '../presentationals/EmailOutStyle'

export default function EmailOut (props) {
  function handleEmailClose (status) {
    props.onCloseClick(status)
  }

  function handleDeleteDraftClick (status) {
    props.onDeleteDraftClick('NewEmail')
    props.onCloseClick('closed')
  }

  function handleNewEmailObj(emailData,type) {
    props.onEmailDataChange(emailData,type)
  }

  function handleSendClick(emailType){
    props.onSendClick('NewEmail')
  }

  return (
    <ScreenTypeContext.Consumer>
      {screnType =>
        
          <EmailOutStyle screnType={screnType}>
            <EmailOutHeader screnType={screnType} 
              emailInfo = {props.emailData}
              onSendClick = {(e)=> handleSendClick(e)}
              onEmailDataChange = {(e)=> handleNewEmailObj(e,'newEmailObj')}
              onCloseClick={(e) => handleEmailClose(e)} 
              onDeleteDraftClick={(e)=>handleDeleteDraftClick(e)}/>

            <EmailOutBody 
              emailInfo = {props.emailData}
              screnType={screnType} 
              onEmailDataChange = {(e)=> handleNewEmailObj(e,'newEmailObj')}/>

            <AttachedDocs attachments={props.emailData.attachments} onEmailDataChange = {(e)=> handleNewEmailObj(e,'newEmailObj')}/>
            
            <EmailOutFooter 
              screnType={screnType} 
              isSavedIndVisible = {props.isSavedIndVisible}
              onDeleteDraftClick = {(e)=>handleDeleteDraftClick(e)} 
              onEmailDataChange = {(e)=> handleNewEmailObj(e,'newEmailObj')}
              onSendClick = {()=> handleSendClick('NewEmail')} />
          </EmailOutStyle>
          
      }
    </ScreenTypeContext.Consumer>
  )
}
