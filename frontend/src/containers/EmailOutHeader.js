import React from 'react'
import EmailOutTitle from '../containers/EmailOutTitle'
import SendToInput from '../containers/SendToInput'
import {$} from '../containers/Context'

export default class EmailOutHeader extends React.Component{
  constructor(props) {
    super(props)
    this.state = {isCopyVisible:false}
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleCopyClick = this.handleCopyClick.bind(this)
    this.handleDeleteDraftClick = this.handleDeleteDraftClick.bind(this)
    this.handleNewEmailObj = this.handleNewEmailObj.bind(this)
    this.handleSendClick = this.handleSendClick.bind(this)
  }
  handleNewEmailObj(emailDataKey,value) {
    this.props.onEmailDataChange({[emailDataKey]:value})
  }

  handleCloseClick (status) {
      this.props.onCloseClick(status)
    }
  handleCopyClick(e) {
      this.setState({isCopyVisible:true})
    }
  handleDeleteDraftClick (draft) {
    this.props.onDeleteDraftClick(draft)
  }

  componentDidMount () {
    this.$copy = $(this.copy)
    this.$copy.tooltip()
  }

  handleSendClick(emailType){
    this.props.onSendClick(emailType)
  }

  render() {
    const emailInfo = this.props.emailInfo
    const copyInput = this.state.isCopyVisible 
        ? <SendToInput 
          onInputChange = {(recipients)=>this.handleNewEmailObj('cc',recipients)}
          recipentsList={emailInfo.cc} 
          isChangable={true} 
          prefix={'Copy:'} 
          isUnderlined={true} 
          className='' />
        : null
    const visible = this.state.isCopyVisible ? 'd-none' : ''
    const copyButton = 
          <div className={`text-black-50 my-email-header-input-prepend ${visible}`}
            ref={el => this.copy = el}
            data-toggle='tooltip'
            data-placement='right'
            title='Add recipient on copy'>
            
            <span className='my-cursor-pointer my-hover-underline' 
              onClick={this.handleCopyClick} >
              Copy
            </span>
          
          </div> 

    return (
      <header>
        <EmailOutTitle 
          screnType={this.props.screnType} 
          onSendClick={this.handleSendClick}
          onCloseClick={this.handleCloseClick}
          onEmailDataChange={(files) => this.handleNewEmailObj('attachments',files)}
          onDeleteDraftClick={this.handleDeleteDraftClick} />

        <div className='mx-4'>

          <div className='d-flex mb-1 border-bottom justify-content-between'>
            <SendToInput
            onInputChange = {(recipients)=>this.handleNewEmailObj('to',recipients)} 
            recipentsList={emailInfo.to} 
            isChangable={true} 
            prefix={'To:'} 
            isUnderlined={false} 
            className='' />
            {copyButton}
          </div>

          {copyInput}

          <div className='d-flex my-1 border-bottom'>
            <input 
              placeholder='Subject'
              onChange={(e)=>this.handleNewEmailObj('subject',e.target.value) }
              type='text' 
              value = {emailInfo.subject}
              className='my-email-header-input'  
              aria-label='subject' />
          </div>

        </div>
      </header>
    )
  }
}
