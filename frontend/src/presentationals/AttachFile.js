import React from 'react'
import {$} from '../containers/Context'



class AttachFile extends React.Component {
  constructor (props) {
    super(props)

    this.handleFile = this.handleFile.bind(this)
  }

  componentDidMount () {
    this.$el = $(this.el)
    this.$el.tooltip()

  }

  handleFile (files){
    const filesWithInfo = Array.from(files).map( file => ({
      name:file.name, size:file.size, file:file}
      ))
    this.props.onEmailDataChange( filesWithInfo )
  }

  render () {
    return (
      <span className='my-cursor-pointer attachFile mx-3'>
         <label>
          <input type='file' name='fileNewEmail' 
            onChange={ (e)=>this.handleFile(e.target.files) } 
            multiple 
            className='my-file-input'/>
            <i className='my-1 material-icons text-black-50 my-line-align-down my-icon'
              ref={ el => this.el = el } 
              data-toggle='tooltip'
              data-placement='top'
              title='attach file'>
            attach_file
            </i>
        </label>
      </span>
    )
  }
}

export default AttachFile