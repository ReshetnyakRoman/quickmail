import React from 'react'

export default function MobileMenuIcon (props) {
  function handleMobileMenuClick () {
    props.onIconClick()
  }

  const open = props.isOpen ? 'open' : ''

  return (
    <div onClick={(e) => handleMobileMenuClick(e)} className={`mobile-menu-icon my-hide-desktop`}>
      <div className={`nav-icon ${open}`}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
