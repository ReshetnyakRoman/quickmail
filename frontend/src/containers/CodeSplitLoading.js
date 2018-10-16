import React from 'react'

export default function Loading(props) {
  if (props.error) {
    return 
      <div>
        Error! 
        <button className='btn my-btn-primay-bordered my-4 mx-auto' onClick={ props.retry }>
          Retry
        </button>
      </div>;
  } else if (props.timedOut) {
    return 
      <div>
        Taking a long time... 
        <button className='btn my-btn-primay-bordered my-4 mx-auto' onClick={ props.retry }>
          Retry
        </button>
      </div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}