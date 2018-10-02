import React from 'react'
import {ControlsContext, $} from '../containers/Context'

export default class EmailControls extends React.Component {
  constructor (props) {
    super(props)

    this.visibility = ''
    this.positioning = 'email-controls'
    this.unreaded = 'email'
    this.title = 'Mark unread'

    if (this.props.status) {
      this.unreaded = 'drafts'
      this.title = 'mark as readed'
    }
    if (this.props.view === 'short') {
      this.visibility = 'display-none'
      this.positioning = 'email-controls-short'
    }
  }

  componentDidMount () {
    this.$reply = $(this.reply)
    this.$replyAll = $(this.replyAll)
    this.$delete = $(this.delete)
    this.$unreaded = $(this.unreadedpopup)
    this.$reply.tooltip()
    this.$replyAll.tooltip()
    this.$delete.tooltip()
    this.$unreaded.tooltip()
  }

  componentWillUnmount () {
  }

  render () {
    const isVisible = this.props.folder === 'Sent' ? {display:'none'} : null
      
    return (
      <ControlsContext.Consumer>
        { handleControlClick => (
          <div className={`${this.positioning}`}>
            <span >
              <i ref={el => this.reply = el}
                onClick={(e) => handleControlClick({
                  type:'reply', 
                  value:'reply', 
                  emailId:this.props.emailId
                })}
                className='material-icons my-tooltip my-icon2'
                data-toggle='tooltip'
                data-placement='top'
                title='Reply'
                data-animation='true'
                data-delay='{ "show": 400, "hide": 100 }'>reply</i>
            </span>

            <i ref={el => this.replyAll = el}
              onClick={(e) => handleControlClick({
                type:'reply', 
                value:'replyAll',
                emailId:this.props.emailId
              })}
              className={`material-icons  ${this.visibility} my-icon2` }
              data-toggle='tooltip'
              data-placement='top'
              title='Reply to All'
              data-animation='true'
              data-delay='{ "show": 400, "hide": 100 }'>reply_all</i>
            <i ref={el => this.delete = el}
              className='material-icons my-icon2'
              data-toggle='tooltip'
              ata-placement='top'
              title='Delete email'
              data-animation='true'
              data-delay='{ "show": 400, "hide": 100 }'
              onClick={(e) => handleControlClick({
                type:'delete', 
                value:'delete',
                emailId:this.props.emailId
              })}
              >delete</i>
              <i ref={el => this.unreadedpopup = el}
                className='material-icons my-icon2'
                style = {isVisible}
                data-toggle='tooltip'
                data-placement='top'
                title={this.title}
                data-animation='true'
                onClick={(e) => handleControlClick({
                  type:'markUnread', 
                  value:this.props.status,
                  emailId:this.props.emailId
                })}
                data-delay='{ "show": 400, "hide": 100 }'>{this.unreaded}
              </i>
            
          </div>
        )}
      </ControlsContext.Consumer>

    )
  }
}
