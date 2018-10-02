import React from 'react'

export default function EmailBody (props) {
	const markUp = {__html:props.emailInfo.body}

  return (
    <div className='p-2 m-2 emailin-body' dangerouslySetInnerHTML={markUp} />
      
  )
}


