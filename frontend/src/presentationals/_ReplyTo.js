import React from 'react'
import MailFrom from '../presentationals/MailFrom'

class ReplyTo extends React.Component {
  constructor (props) {
    super(props)
    this.forwardInput = React.createRef()
  }

  componentDidMount () {
    this.props.replyOrForward === 'forward'
      ? this.forwardInput.current.focus()
      : null
  }

  render () {
    if (this.props.replyOrForward === 'forward') {
  	return (
    <div className={`reply-to d-flex ${this.props.className}`}>
          <div className='d-flex mb-1 full-width'>
        <div className='text-black-50 small my-email-header-input-prepend'>
              <span >Forward: &nbsp;</span>
            </div>
        <input ref={this.forwardInput} type='text' className='my-email-header-input' name='Forward to' />
      </div>
        </div>
  		)
    }

    return (
      <div className={`reply-to d-flex ${this.props.className}`}>
        <span className='small text-black-50'>Reply:&nbsp;</span>
        <MailFrom emailInfo={this.props.emailInfo} view='small' className='small' />
      </div>
    )
  }
}

export default ReplyTo
