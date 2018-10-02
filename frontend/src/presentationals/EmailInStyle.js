import React from 'react'
import config from '../presentationals/AnimationConfig'
import {Motion, spring} from 'react-motion'

export default function EmailInStyle (props) {
  return (
    <Motion defaultStyle={{x: 100}} style={{ x: spring(0, config.emailListConfig) }}>
      { ({x}) =>
        <div className={`${props.className} shadow-sm emailIn-style`} style={{transform: `translateX(${x}%)`}}>
          {props.children}
        </div>
	   }
    </Motion>
  )
}
