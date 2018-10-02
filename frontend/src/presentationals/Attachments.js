import React from 'react'
import FormatBytes from '../containers/formatBytes'

export default function Attachments (props) {
  if (props.emailInfo.attachments) {
    const attachments = props.emailInfo.attachments.map(file =>
      <div className='my-attach-card' key={file.name}>

        <div className='icon'>
          <i className='material-icons'>
          attachment
          </i>
        </div>
        <div className='card-footer'>{file.name}</div>

        <div className='overlay'>
          <a href={file.url} style={{textDecoration:'none',color:'white'}} target='blank'>
          <p>{file.name}</p>
          <i className='material-icons'>
          cloud_download
          </i>
          <p className='my-font-size-sm'>Download ({FormatBytes(file.size)})</p>
          </a>
        </div>
      </div>
    )
    return (
      <div className=''>
        <hr className='my-hr' />
        <div className='d-flex'>
          {attachments}
        </div>
      </div>
    )
  }

  return (
    <div />
  )
}
