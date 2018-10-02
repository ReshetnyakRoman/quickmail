import React from 'react'
import SendButton from '../presentationals/SendButton'
import AttachFile from '../presentationals/AttachFile'
import DeleteDraft from '../presentationals/DeleteDraft'
import CloseEmail from '../presentationals/CloseEmail'

export default function EmailOutTitle (props) {
  function handleCloseClick (status) {
    props.onCloseClick('closed')
  }

  function handleSendClick(emailType){
    props.onSendClick()
  }

  function handleNewEmailObj(files) {
    props.onEmailDataChange(files)
  }

  function handleDeleteDraftClick(draft){
    props.onDeleteDraftClick()
  }

  const [show, titleStyle] = props.type === 'reply' ? ['d-none', 'emailOutTitleReply'] : ['', 'emailOutTitle']
  const closeEmailBtn = props.type === 'reply' 
    ? null 
    : <CloseEmail screnType='props.screnType' onCloseClick={(e) => handleCloseClick(e)} />
  if (props.screnType !== 'desktop') {
    return (
      <div
        className={`d-flex justify-content-around align-items-baseline my-color-blue ${titleStyle}`}>
        <SendButton screnType='props.screnType' onSendClick={(e)=>handleSendClick(e)}/>
        <AttachFile screnType='props.screnType' onEmailDataChange={(files) => handleNewEmailObj(files)} />
        <DeleteDraft screnType='props.screnType'  onDeleteDraftClick={(e) => handleDeleteDraftClick(e)} />
        {closeEmailBtn}
      </div>
    )
  }

  return (
    <p className={`my-color-dark px-4 py-2 ${show}`}>
        New message
      <span className='float-right my-font-size-xl my-line-align-up my-cursor-pointer' onClick={(e) => handleCloseClick()}>&times;</span>
    </p>
  )
}
