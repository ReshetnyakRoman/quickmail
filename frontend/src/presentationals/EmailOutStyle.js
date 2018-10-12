import React from 'react'
import {Motion, spring, TransitionMotion} from 'react-motion'
import config from '../presentationals/AnimationConfig'

const animConfig = config.newEmailConfig

export default class EmailOutStyle extends React.Component {
  constructor (props) {
    super(props)
  }

  willLeave (styleCell) {
    return {
      positionY: spring(600, animConfig),
      opacity: spring(0)
    }
  }

  render () {
    const styles = [{
      key: 'EmailOut',
      style: {
        positionY: spring(0, animConfig),
        opacity: spring(1)
      }
    }]
    const defStyles = [{
      key: 'EmailOut',
      style: {
        positionY: this.props.screnType !== 'desktop' ? spring(0, animConfig) : spring(600, animConfig),
        opacity: spring(1)
      }
    }]


    return (
      <TransitionMotion
        willLeave={this.willLeave} defaultStyles={defStyles}
        styles={styles}>

        { (styles) =>
          <div key='EmailOut'
            className='border shadow-sm mb-2 pb-2 emailOut-style'
            style={{
              transform: `translateY(${styles[0].style.positionY}px)`,
              opacity: styles[0].style.opacity
            }}>
            {this.props.children}
          </div>
        }
      </TransitionMotion>
    )
  }
}
