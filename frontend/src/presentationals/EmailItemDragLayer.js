import React from 'react'
import Types from '../containers/ItemType'
import { DragLayer } from 'react-dnd'

const layerStyles = {
	position:'fixed',
	pointerEvents: 'none',
	zIndex:100,
	left:0,
	top:0,
	width:'100%',
	height:'100%',
}

function getItemStyles(props) {
	const { currentOffset } = props
	if(!currentOffset){
		return {display:'none'}
	}

	const {x,y} = currentOffset
	const transform = `translate(${x}px,${y}px)`

	return {
		transform: transform,
		WebkitTransform: transform
	}
}

class EmailItemDragLayer extends React.Component {
	renderItem(type, item) {
		switch (type) {
			case Types.email:
			 return(
			 	<div style={{backgroundColor:'#20a8d8',color:'white', display:'inline-block'}}><i className='material-icons'>mail_outline</i>Move email</div>
			 	)
		}
	}

	render() {
		const {item, itemType,isDragging} = this.props
		
		if (!isDragging) {
			return null
		}

		return (
			<div style={layerStyles}>
				<div style={getItemStyles(this.props)}>
					{ this.renderItem(itemType,item) }
				</div>
			</div>
			)
	}

}

export default DragLayer(monitor =>({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging()
}) )(EmailItemDragLayer)