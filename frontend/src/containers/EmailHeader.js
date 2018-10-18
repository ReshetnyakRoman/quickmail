import React from 'react'
import Avatar from '../presentationals/Avatar'
import Subject from '../presentationals/Subject'
import AttachmentIndicator from '../presentationals/AttachmentIndicator'
import ReceivingDate from '../presentationals/ReceivingDate'
import EmailControls from '../containers/EmailControls'
import CollapseDetails from '../presentationals/CollapseDetails'
import SendToInput from '../containers/SendToInput'
import {Link} from 'react-router-dom'

class EmailHeader extends React.Component {
  constructor (props) {
    super(props)
    
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleDeleteEmail = this.handleDeleteEmail.bind(this)
    this.handleShowDetails = this.handleShowDetails.bind(this)
    
    this.state = {isDetailsVisible:false}
  }

  handleCloseClick () {
    //const status = {ContentBoxStatus: 'EmailList', replyEmailStatus: 'none', OpenEmailInData:''}
    this.props.onCloseClick()
  }

  handleShowDetails (e) {
    this.setState(prevState => ({isDetailsVisible:true}))
  }

  handleDeleteEmail(email) {
    this.props.onDeleteEmailClick(email)
  }
  

  render () {
    const visiblility = this.state.isDetailsVisible ? '' : 'my-hide-mobile'
    const Details = this.state.isDetailsVisible 
      ? null
      : <CollapseDetails onShowDetailsClick={this.handleShowDetails}/>
    

    return (
      <header className='p-2'>

        <div className='full-width d-flex justify-content-between'>
          <EmailControls view='full' 
            onDeleteEmailClick={this.handleDeleteEmail} 
            folder={this.props.currentFolder} 
            emailId={this.props.emailInfo.emailId}/>
          <Link to={`/${this.props.currentFolder.toLowerCase()}`} className='LinkToDefaults'>  
            <i onClick = {this.handleCloseClick}
              onTouchEnd = {this.handleCloseClick}
              className='material-icons my-cursor-pointer  my-line-align-down my-icon'
              style={{height: '24px'}}>
            close
            </i>
          </Link>
        </div>

        <div className='d-flex p-1'>
          <Avatar user={this.props.emailInfo} view='square' className='mr-2 mt-1' />
          <div className='full-width position-relative d-flex flex-column my-space-between'>

            <div className='position-relative mb-1'>
              <SendToInput
                recipentsList={[this.props.emailInfo.from]}
                isChangable={false}
                prefix={'From:'}
                isUnderlined={false}
                className='' />
              <ReceivingDate emailInfo={this.props.emailInfo} view='full' className='float-right reciving-date-mobile' />
            </div>
            <AttachmentIndicator emailInfo={this.props.emailInfo} className='attachments-ind-position' />
            {Details}
            <div className={visiblility}>
              <SendToInput
                recipentsList={this.props.emailInfo.to}
                isChangable={false}
                prefix={'To:'}
                isUnderlined={false}
                className='' />
              <SendToInput
                recipentsList={this.props.emailInfo.cc}
                isChangable={false}
                prefix={'Copy:'}
                isUnderlined={false}
                className='' />

            </div>
            <Subject emailInfo={this.props.emailInfo} view='full' />

          </div>
        </div>

      </header>
    )
  
  }
}

export default EmailHeader
