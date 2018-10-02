import React from 'react'
import SendButton from '../presentationals/SendButton'
import AttachFile from '../presentationals/AttachFile'
import DeleteDraft from '../presentationals/DeleteDraft'
import SavedInd from '../presentationals/SavedInd'

export default function EmailOutFooter (props) {
  const isDesktop = props.screnType === 'desktop' ? 1 : 0
  const visible = ['d-none', '']

  function handleDeleteDraftClick () {
    props.onDeleteDraftClick()
  }
  function handleNewEmailObj(emailDataKey,value) {
    props.onEmailDataChange({[emailDataKey]:value})
  }

  function handleSendClick(){
    props.onSendClick()
  }

  return (
    <footer className={`py-2 px-4 ${visible[isDesktop]}`} >
      <SendButton screnType={props.screnType} onSendClick={(e)=>handleSendClick(e)}/>
      <AttachFile screnType={props.screnType} onEmailDataChange={(files)=>handleNewEmailObj('attachments',files)}/>
      <DeleteDraft screnType={props.screnType} onDeleteDraftClick={(e) => handleDeleteDraftClick(e)} />
      <SavedInd isVisible={props.isSavedIndVisible} />
    </footer>
  )
}
