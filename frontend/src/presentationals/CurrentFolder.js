import React from 'react'
import {Motion, spring} from 'react-motion'



export default class CurrentFolder extends React.Component {

	render () {

		const folder = this.props.screnType === 'desktop' 
		? <h3 className='mb-0 currnt-folder'><i className="material-icons">folder_open</i> {this.props.folder}</h3> 
		: <h4 className='mb-0 currnt-folder'><i className="material-icons">folder_open</i> {this.props.folder}</h4>

		return (
			<Motion  style={{ x: spring(this.props.isVisible ? 100 : 0) }}>
        { ({x}) =>
			    <div className={`${this.props.className}`} style={{opacity:`${x}%`, width: `${x}%`, overflow:'hidden', }}>
			      			
						{folder}
			    </div>
				}
       </Motion>
  	)
	}
  
}
