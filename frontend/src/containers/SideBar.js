import React from 'react'
import MobileMenuIcon from '../presentationals/MobileMenuIcon'
import SideBarStyling from '../presentationals/SideBarStyling'
import Avatar from '../presentationals/Avatar'
import SideBarMenu from '../containers/SideBarMenu'
//import {userData} from '../data/data'
import AccountInfo from '../presentationals/AccountInfo'
import NewMailButton from '../presentationals/NewMailButton'
import ScreenTypeContext from '../containers/Context'
//import serverURL from '../config'

class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSideBarOpen: false
    }
    this.handleCurrentFolder = this.handleCurrentFolder.bind(this)
    this.handleAddFolderClick = this.handleAddFolderClick.bind(this)
    this.handleNewEmail = this.handleNewEmail.bind(this)
    this.handleMobileMenuIconClick = this.handleMobileMenuIconClick.bind(this)
    this.handleInboxToogle = this.handleInboxToogle.bind(this)
    this.handleDeleteFolderClick = this.handleDeleteFolderClick.bind(this)
    this.handleExitClick = this.handleExitClick.bind(this)
  }
  handleCurrentFolder (folder) {
    this.props.onFolderChange(folder)

    if (this.state.isSideBarOpen) {
      this.handleMobileMenuIconClick()
    }
  }

  handleAddFolderClick (status) {
    this.props.onAddFolderClick(status)
  }

  handleDeleteFolderClick (folder) {
    this.props.onDeleteFolderClick(folder)
  }

  handleNewEmail (status) {
    this.props.onNewEmailClick(status)
  }

  handleMobileMenuIconClick () {
    this.setState(prevState => ({
      isSideBarOpen: !prevState.isSideBarOpen
    }))
  }

  handleInboxToogle(status) {
    this.props.onInboxCollapseClick(status)
  }

  handleExitClick(status, data) {
    this.props.onExitClick(status, data)
  }

  componentDidMount () {

  }

  render () {
    const userData = {avatar: this.props.userInfo.pic}
    return (
      <ScreenTypeContext.Consumer>
        {screnType =>
          <div>
            <MobileMenuIcon isOpen = {this.state.isSideBarOpen} onIconClick = {this.handleMobileMenuIconClick} />
            <SideBarStyling isOpen = {this.state.isSideBarOpen} screnType = {screnType}>
              <div className='account-block'>
                <Avatar user={userData} type='circle' className='mx-auto my-4' />
                <AccountInfo user={this.props.userInfo} name={this.props.userInfo} onExitClick={this.handleExitClick}/>
              </div>
              <NewMailButton onNewEmailClick = {this.handleNewEmail} />
              <SideBarMenu 
                inboxUnreaded = {this.props.inboxUnreaded}
                userFolders = {this.props.userFolders}
                isInboxOpen = {this.props.isInboxOpen}
                currentFolder = {this.props.folder}
                onDeleteFolderClick = {this.handleDeleteFolderClick}
                onFolderChange = {this.handleCurrentFolder}
                onAddFolderClick = {this.handleAddFolderClick}
                onInboxCollapseClick = {this.handleInboxToogle} />
            </SideBarStyling>
          </div>
        }
      </ScreenTypeContext.Consumer>
    )
  }
}

export default SideBar
