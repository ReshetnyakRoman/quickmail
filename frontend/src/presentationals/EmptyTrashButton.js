import React from 'react'
import {$} from '../containers/Context'

export default class EmptyTrashButton extends React.Component {
  componentDidMount () {
    this.$deleteButton = $(this.deleteButton)
    this.$deleteButton.tooltip()
  }

  render () {
    const showDeleteButton = this.props.folder !== 'Trash' ? 'd-none' : ''
    return (
      <span
        className={`my-font-size-md my-btn-danger m-1 my-cursor-pointer ${showDeleteButton}`}
        data-toggle='tooltip'
        data-placement='bottom'
        title='Empty trash'
        ref={el => this.deleteButton = el}
        data-animation='true'
        onClick={() => this.props.onEmptyTrash()}
        data-delay='{ "show": 400, "hide": 100 }'>
        <i className='material-icons pt1-1'>
          delete_forever
        </i>
      </span>
    )
  }
}
