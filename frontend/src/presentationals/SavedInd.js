import React from 'react'

function SavedInd (props) {
	return (
		<span className='float-right mt-3 text-black-50' style={{display: props.isVisible ? '' : 'none'}}>Saved</span>
		)
}

export default SavedInd