import React from 'react'

export default function Modal (props) {
	function handleModalClose () {
		props.onModalClose()
	}
	return (
		<div className="my-modal">
			<div className="my-modal-container">
				<div className='my-modal-header my-font-size-lg'>{props.modal.header}</div>
				<div className='my-modal-body text-black-50'>{props.modal.body}</div>
				<div className="my-modal-footer">
					<span onClick={(e)=>handleModalClose(e)} className='my-btn-primay p-2 my-cursor-pointer' >
						{props.modal.closeButtonText}
					</span>
				</div>
			</div>
		</div>
	)
}