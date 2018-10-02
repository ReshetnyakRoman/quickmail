import React from 'react'

export default function ProgressBar (props) {
  const progress = props.status.progress
  const width = progress != '' ? progress : 100
  return (
    <div className={`my-myprogress`}>
      <div className='progress'>
        <div
          className='progress-bar progress-bar-striped progress-bar-animated'
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemin='0'
          aria-valuemax='100'
          style={{width: `${width}%`}} >
          {progress}{progress && '%'}
        </div>
      </div>

    </div>
  )
}
