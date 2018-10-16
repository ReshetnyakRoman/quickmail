import React from 'react'
import EmailHeader from '../containers/EmailHeader'
import Attachments from '../presentationals/Attachments'
import EmailBody from '../presentationals/EmailBody'
import Footer from '../presentationals/Footer'
import EmailInStyle from '../presentationals/EmailInStyle'
import ReplySection from '../containers/ReplySection'
import ScreenTypeContext from '../containers/Context'
import ErrorBoundary from '../containers/ErrorBoundary'

export default function EmailIn (props) {

  function handleCloseClick (status) {
    props.onCloseClick({ContentBoxStatus: 'EmailList', replyEmailStatus: 'none', OpenEmailInData:''})
  }

  function handleSendClick(emailType){
    props.onSendClick('ReplyEmail')
  }

  function handleFooterButtonsClick (status, email) {
      props.onFooterButtonClick(status, email)
    }

  function handleDeleteDraftClick (draft) {
    props.onDeleteDraftClick('ReplyEmail')
    props.onCloseClick({replyEmailStatus:'none'})
  }

  function handleReplyEmailObj(emailData) {
    props.onEmailDataChange(emailData)
  }

  const footer = props.replyEmailStatus === 'none'
      ? () => <Footer onButtonClick={(status,email)=>handleFooterButtonsClick(status,email)} emailInfo={props.emailData}/>
      : (screnType) => <ReplySection
        emailInfo = {props.emailData}
        screnType = {screnType}
        attachments = {props.attachments}
        isSavedIndVisible = {props.isSavedIndVisible}
        replyEmailStatus = {props.replyEmailStatus}
        onSendClick = {(e) => handleSendClick(e)}
        onEmailDataChange = {(e) => handleReplyEmailObj(e)}
        onDeleteDraftClick = {(e) => handleDeleteDraftClick(e)} />

  return (
      <ScreenTypeContext.Consumer>
        {screnType =>
          <EmailInStyle>
            <ErrorBoundary>
              <EmailHeader emailInfo={props.emailData} onCloseClick={(e)=>handleCloseClick(e)} currentFolder = {props.currentFolder} />
              <EmailBody emailInfo={props.emailData}/>
              <Attachments emailInfo={props.emailData} />
              {footer(screnType)}
            </ErrorBoundary>
          </EmailInStyle>
        }
      </ScreenTypeContext.Consumer>
    )
  
}


