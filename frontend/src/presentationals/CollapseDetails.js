import React from 'react'

function CollapseDetails (props) {

  function handleShowDetails (e) {
    props.onShowDetailsClick()
  }

  return (
    <div className='my-hide-desktop small collapse-details' onClick={(e)=>handleShowDetails(e)}>
      <span className='text-black-50'>To: </span>
      <span className='my-text-blue'>
        show details
        <i className='material-icons small my-line-align-down'>arrow_drop_down</i>
      </span>
    </div>
  )
}

export default CollapseDetails