import React from 'react'

export default function SideBarStyling (props) {
  const visibility = props.isOpen ? 'menu-width-opacity' : ''

  return (
    <aside className={`my-color-dark side-bar justify-content-start d-flex flex-column ${visibility}`}>
      {props.children}
    </aside>
  )
}
