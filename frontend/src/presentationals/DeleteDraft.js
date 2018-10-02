import React from 'react'
import {$} from '../containers/Context'

export default class DeleteDraft extends React.Component {
  constructor (props) {
    super (props)
    this.handleDeleteDraftClick = this.handleDeleteDraftClick.bind(this)
  }

  componentDidMount () {
    this.$el = $(this.el)
    this.$el.tooltip()
  }

  handleDeleteDraftClick (id,event) {
    this.props.onDeleteDraftClick()
  }
  render () {
    return (
      <span className='my-cursor-pointer deleteDraft'
        data-toggle='tooltip'
        data-placement='top'
        ref={ el => this.el = el }
        onClick={(e)=>this.handleDeleteDraftClick(e)}
        title='delete draft'>

        <i className='material-icons text-black-50 my-line-align-down my-icon'>
          delete_forever
        </i>

      </span>
    )
  }
  
}
