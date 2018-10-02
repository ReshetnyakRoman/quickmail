import React from 'react'

const $ = window.$
export {$}

const ScreenTypeContext = React.createContext('desktop')
export default ScreenTypeContext

const ControlsContext = React.createContext('none')
export {ControlsContext}
