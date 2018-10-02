import React from 'react'
import FormatBytes from '../containers/formatBytes'

export default function AttachedDocs (props) {

  function handleDeleteAttachClick(index,fileName,e) {
    props.onEmailDataChange({delete:fileName})
  }

  if ( props.attachments.length === 0 ){
    return null
  }
  
  const attachments = props.attachments.map((file,index) =>
    <p
      key={index}
      className='font-weight-bold border m-1 attached-doc align-items-center justify-content-between px-1 my-font-size-md d-flex flex-nowrap' >
      <span>{file.name}&nbsp;</span>
      <span className='text-black-50'>({FormatBytes(file.size)})</span>
      <span onClick={(e)=>handleDeleteAttachClick(index,file.name,e)} className='pl-3 my-cursor-pointer'>&times;</span>
    </p>
  )
  
  return (
    <div className='d-flex px-4 my-2 flex-wrap'>
      {attachments}
    </div>
  )
}
