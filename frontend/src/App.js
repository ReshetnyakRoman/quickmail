import React from 'react'
import ScreenTypeContext from './containers/Context'
import SideBar from './containers/SideBar'
import getUserFolders from './containers/getUserFolders'
import TopBar from './containers/TopBar'
import EmailIn from './containers/EmailIn'
import EmailList from './containers/EmailList'
import EmailOut from './containers/EmailOut'
import NewMailButton from './presentationals/NewMailButton'
import LogIn from './presentationals/LogIn'
import Notifications from './containers/Notifications'
import AddFolder from './presentationals/AddFolder'
import DeleteConfirmation from './presentationals/DeleteConfirmation'
import ProgressBar from './presentationals/ProgressBar'
import Loader from './presentationals/Loader'
import MainLoader from './presentationals/MainLoader'
import {ControlsContext} from './containers/Context'
import Modal from './presentationals/Modal'
import {debounce} from 'throttle-debounce'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
//import EmailItemDragLayer from './presentationals/EmailItemDragLayer'
import ErrorBoundary from './containers/ErrorBoundary'
import handleSendEmail from './containers/handleSendEmail'
import handleEmailObj from './containers/handleEmailObj'
import serverURL, {domainName} from './config'
import fetchWithTimeOut from './containers/fetchWithTimeOut'
import findDifference from './containers/findDifference'
import getEmailList from './containers/getEmailList'
import authorizedHeader from './containers/authorizedHeader'
import markUnread from './containers/markUnread'
import {getLastShownUID, getFirstShownUID} from './containers/ShownUIDs'



class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleCreateFolderClick = this.handleCreateFolderClick.bind(this)
    this.handleEmptyTrash = this.handleEmptyTrash.bind(this)
    this.handleMoveEmailToFolder = this.handleMoveEmailToFolder.bind(this)
    this.handleEmailListLoading = this.handleEmailListLoading.bind(this)
    this.updateMailBoxInfo = this.updateMailBoxInfo.bind(this)
    this.updateFoldersInfo = this.updateFoldersInfo.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.handleEmailClick = this.handleEmailClick.bind(this)
    this.handleCurrentFolder = this.handleCurrentFolder.bind(this)
    this.handleNewEmail = this.handleNewEmail.bind(this)
    this.handleAddFolderClick = this.handleAddFolderClick.bind(this)
    this.handleReplyClick = this.handleReplyClick.bind(this)
    this.handleCloseEmailClick = this.handleCloseEmailClick.bind(this)
    this.handleDeleteDraft = this.handleDeleteDraft.bind(this)
    this.handleDeleteEmail = this.handleDeleteEmail.bind(this)
    this.handleControlsClick = this.handleControlsClick.bind(this)
    this.notificationStop = this.notificationStop.bind(this)
    this.handleInboxToogle = this.handleInboxToogle.bind(this)
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this)
    this.handleExitClick = this.handleExitClick.bind(this)
    this.savedIndHide = this.savedIndHide.bind(this)
    this.savedIndShow =  this.savedIndShow.bind(this)
    this.notifcationShow = this.notifcationShow.bind(this)
    this.progressBar = this.progressBar.bind(this)
    this.updateLoggedInState =  this.updateLoggedInState.bind(this)
    this.updateCurrentUserData = this.updateCurrentUserData.bind(this)
    this.saveDraftDebounced = debounce(3000, this.saveDraft)
    this.handleSearch = this.handleSearch.bind(this)
    this.defaultEmailState = {
        id:'',
        MessageID:'',
        from:'',
        to:[],
        cc:[],
        subject:'',
        body:'',
        priority:'normal', //variants: important
        attachments:[],
      }
    this.defaultModalState = {header:'', body:'', footer:'', closeButtonText:'OK', isVisible: false}
    this.state = {
      dump: false,
      screen: {width: 0, height: 0},
      screnType: 'desktop',
      progressBarStatus: {isVisible: false, progress: ''},
      currentFolder: 'Inbox',
      notification: {body: '', isVisible: false},
      ContentBoxStatus: 'EmailList',
      OpenEmailInId: '',
      OpenEmailInData: '',
      replyEmailStatus: 'none',
      replyEmailObj: this.defaultEmailState,
      newEmailStatus: 'closed',
      newEmailObj: this.defaultEmailState,
      modal: this.defaultModalState,
      currentUser: {email:'unknown', name:'unknown', ID:'', loginType:'', accessToken:'' },
      isSavedIndVisible: {NewEmail: false, ReplyEmail: false },
      isInboxOpen:false,
      isAddFolderVisible: false,
      isAppLoaded: false,
      isLoggedIn: false,
      isLoading: false,
      folderToDelete: '',
      isSearchVisible: false,
      searhText:'',
      emailList: {
        'Inbox': {emails:[], default: true, unreaded:0, UIDs:[]},
        'Draft': {emails:[], default: true, unreaded:0, UIDs:[]},
        'Sent': {emails:[], default: true, unreaded:0, UIDs:[]},
        'Trash': {emails:[], default: true, unreaded:0, UIDs:[]},
        'Search': {emails:[], default: true, unreaded:0, UIDs:[]},
      },
      emailBatchToUpload:5,
      userFolders:[],
      contentBoxMessage:'',
      warningTimeout: 60000, //1min
      mailBoxInfoUpdateInterval: 15000, //20sec
    }

  }

  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    
  }

  updateLoggedInState(status, data=this.state.currentUser) {
    this.setState({isLoggedIn: status, currentUser: data})
    if (status) {
      this.checkNewEmailDeamon = setInterval(this.updateMailBoxInfo, this.state.mailBoxInfoUpdateInterval)
    } else {
      clearInterval(this.checkNewEmailDeamon)
    }
  }

  updateCurrentUserData(data) {
    this.setState({currentUser: data})
  }

  handleEmailListLoading (folder) {
    getEmailList(this, folder)
    .then(() => this.setState({isLoading: false}))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  handleInboxToogle (status) {
    this.setState({isInboxOpen: status})
  }

  updateMailBoxInfo () {
    const url = new URL(`${serverURL}/update`)
    const config = {method: 'GET', headers: authorizedHeader(this)}
    
    fetchWithTimeOut(url, config, 10000)
    .then(res => res.json())
    .then(res => {
      console.log('Mailbox updated data received')
      return res
    })
    .then(res => findDifference(res.folders, this))
    .then(updatedFolders =>{
      for (let folder of updatedFolders) {
        getEmailList(this, folder.folder,folder.stepsBack, true)
      }
    })
    .catch(err => console.log(err))
  }

  updateFoldersInfo (folders) {
    this.setState(prevState => {
      for (let folder of folders) {
        prevState.emailList[folder.folder] = {
          unreaded:folder.unreaded,
          default:folder.default,
          emails:[],
          UIDs: folder.UIDs
        }
      }
      return {emailList: prevState.emailList}
    })
  }

  handleSearch () {
    if (this.state.searhText !== '') {
      this.setState(prevState => {
        prevState.isLoading = true 
        prevState.emailList.Search.emails = []
        prevState.emailList.UIDs = []
        return prevState
      })
    
      const url = new URL(`${serverURL}/search`)
      url.search = new URLSearchParams({keyword: this.state.searhText})
      const config = {method: 'GET', headers: authorizedHeader(this)}
      const stateBackup = this.state.emailList

      fetchWithTimeOut(url, config, 30000)
      .then(res => res.json(), err => console.log('Cant parse response'))
      .then(
        res => {
          if (res.success) {
            this.setState(prevState => {
              prevState.currentFolder = 'Search'
              prevState.emailList.Search.emails = res.emailList
              prevState.emailList.UIDs = res.UIDs
              prevState.isLoading = false
              return prevState
            })
          } else {
            this.setState({emailList: stateBackup, isLoading: false})
            console.log(res.message)
          }
        },
        err => {
          console.log('Cant execute search request')
          this.setState({emailList: stateBackup, isLoading: false})
        }
      )
    }
  }

  handleDeleteDraft(draft) {
    var DraftID
    if (draft === 'ReplyEmail'){
      this.setState({replyEmailStatus: 'none', replyEmailObj: this.defaultEmailState})
      DraftID = b64EncodeUnicode(this.state.replyEmailObj.MessageID)
    } else {
      this.setState({newEmailStatus: 'closed', newEmailObj: this.defaultEmailState})
      DraftID = b64EncodeUnicode(this.state.newEmailObj.MessageID)
    }   

    const url = new URL(`${serverURL}/draft/${DraftID}`)
    const config = {method: 'DELETE', headers: authorizedHeader(this)}
    const stateBackup = this.state.emailList

    fetchWithTimeOut(url, config, 10000)
    .then(res => res.json(), err => console.log('Cant parse response'))
    .then(
      res => {
        if (res.success) {
          console.log(`Draft ${DraftID} successfully deleted`)
        } else {
          this.setState({emailList: stateBackup})
          console.log(res.message)
        }
      },
      err => {
        console.log('Cant execute draft removal')
        this.setState({emailList: stateBackup})
      }
    )
  }

  handleDeleteEmail(type, uid){
    const currentFolder = this.state.currentFolder
    var emails = this.state.emailList[currentFolder].emails
    
    this.setState({
      ContentBoxStatus: 'EmailList',
      OpenEmailInId: '',
      OpenEmailInData: '',
      replyEmailStatus: 'none',
      replyEmailObj: this.defaultEmailState,
    })

    if (currentFolder !== 'Trash') {
      this.handleMoveEmailToFolder(uid, 'Trash')
    } else {
      
      this.setState(
        prevState => {
          //removing email from email list
          for (let emailInd in emails) {
            if(emails[emailInd].emailId === uid) {
              emails.splice(emailInd,1)
              break
            }
          }
          prevState.emailList[currentFolder].emails = emails
          return prevState
        })

      const url = new URL(`${serverURL}/trash/${uid}`)
      const config = {method: 'DELETE', headers: authorizedHeader(this)}
      const stateBackup = this.state.emailList

      fetchWithTimeOut(url, config, 10000)
      .then(res => res.json(), err => console.log('Cant parse response'))
      .then(
        res => {
          if (res.success) {
            console.log(`Email ${uid} successfully deleted`)
          } else {
            this.setState({emailList: stateBackup})
            console.log(res.message)
          }
        },
        err => {
          console.log('Cant execute email removal')
          this.setState({emailList: stateBackup})
        }
      )
    }
  }

  handleEmptyTrash () {
    const url = new URL(`${serverURL}/trash/`)
    const config = {method: 'DELETE', headers: authorizedHeader(this)}
    const stateBackup = this.state.emailList
    
    this.setState(prevState => {
      prevState.emailList.Trash.emails = []
      return {emailList: prevState.emailList}
    })

    fetchWithTimeOut(url, config, 10000)
    .then(res => res.json(), err => console.log('Cant parse response'))
    .then(
      res => {
        if (res.success) {
          console.log(`Trash folder empty`)
        } else {
          this.setState({emailList: stateBackup})
          console.log(res.message)
        }
      },
      err => {
        console.log('Cant execute email removal')
        this.setState({emailList: stateBackup})
      }
    )
  }

  updateWindowDimensions () {
    let screnType = 'desktop'
    if (window.innerWidth <= 320) {
      screnType = 'small-mobile'
    } else {
      screnType = window.innerWidth < 768 ? 'mobile' : 'desktop'
    }

    this.setState({
      screen: {width: window.innerWidth, height: window.innerHeight},
      screnType: screnType
    })
  }

  handleCurrentFolder (folder) {
    this.setState(prevState => {
      if (!(folder in prevState.emailList)) {
        prevState.emailList[folder] = {emails: [], default: false, unreaded: 0, UIDs:[]}
      }
      prevState.emailList.Search = {emails: [], default: true, unreaded: 0, UIDs:[]}
      
      return {
      ContentBoxStatus: 'EmailList',
      searhText:'',
      isSearchVisible:false,
      currentFolder: folder,
      replyEmailStatus: 'none',
      replyEmailObj: this.defaultEmailState,
      emailList: prevState.emailList
    }})
  }

  handleEmailClick (emailId) {
    let email = this.state.emailList[this.state.currentFolder].emails.filter(email => email.emailId === emailId)
    if ( this.state.emailList[this.state.currentFolder].emails.filter(email => email.emailId === emailId)[0].isUnreaded ) {
      markUnread(this, true, emailId)
    }
    if (this.state.currentFolder === 'Draft') {
      this.setState({newEmailObj: email[0], newEmailStatus: 'open'})
    } else {
      this.setState({ContentBoxStatus: 'EmailIn', OpenEmailInData: email[0]})
    }
    
  }

  handleMoveEmailToFolder (uid, toFolder) {
    const fromFolder= this.state.currentFolder
    const url = new URL(`${serverURL}/${fromFolder}/${uid}/${toFolder}`)
    const config = {method: 'PUT', headers: authorizedHeader(this)}
    const emails = this.state.emailList[fromFolder].emails
    var email = emails.filter(email => email.emailId === uid)[0]
    const stateBackup = this.state.emailList
    
    this.setState(
      prevState => {
        //removng email from original folder
        for (let emailInd in emails) {
          if(emails[emailInd].emailId === uid) {
            emails.splice(emailInd,1)
            break
          }
        }
        prevState.emailList[fromFolder].emails = emails

        if (email.isUnreaded) {
          prevState.emailList[fromFolder].unreaded -=  1
          prevState.emailList[toFolder].unreaded += 1
        }

        email.emailId = getFirstShownUID(prevState.emailList[toFolder].emails) + 1
        prevState.emailList[toFolder].emails.push(email)
        return prevState
      })

    fetchWithTimeOut(url, config, 15000)
    .then(res => res.json(), err => console.log('Cant parse response'))
    .then(
      res => {
        if (res.success) {
          console.log(`Email with uid ${uid}, moved to ${toFolder}`)
        } else {
          this.setState({emailList: stateBackup})
          console.log(res.message)
        }
      },
      err => {
        console.log('Cant execute email move')
        this.setState({emailList: stateBackup})
      }
    )
  }

  handleControlsClick (controlElement) {
    const emailId = controlElement.emailId
    const value = controlElement.value
    if(controlElement.type === 'reply') {
      if ( this.state.emailList[this.state.currentFolder].emails.filter(email => email.emailId === emailId)[0].isUnreaded ) {
        markUnread(this, true, emailId)
      }
      let receivedEmail = this.state.emailList[this.state.currentFolder].emails.filter(email => email.emailId === emailId)
      this.handleReplyClick(value, receivedEmail[0])
            
    }
    if(controlElement.type === 'markUnread') {
      markUnread(this, value, emailId)
    }
    if(controlElement.type === 'delete') {
      this.handleDeleteEmail(value, emailId)
    }
  }

  handleAddFolderClick (status) {
    this.setState(prevState => ({
      isAddFolderVisible: status
    }))

  }

  handleCreateFolderClick (folderName) {
    const url = new URL(`${serverURL}/${folderName}`)
    const config = {method: 'POST', headers: authorizedHeader(this)}
    const stateBackup = this.state.emailList
    
    if (!(folderName in this.state.emailList)){

      this.setState(prevState => {
        prevState.emailList[folderName] = {emails:[], default:false, unreaded:0, }
        return {emailList: prevState.emailList}
      })

      fetchWithTimeOut(url, config, 15000)
      .then(res => res.json(), err => console.log('Cant parse response'))
      .then(
        res => {
          if (res.success) {
            console.log(`${folderName} created`)
          } else {
            this.setState({emailList: stateBackup})
            console.log(res.message)
          }
        },
        err => {
          console.log('Cant execute email move')
          this.setState({emailList: stateBackup})
        }
      )
    } else {
      alert(`Folder with name ${folderName} already exist!`)
    }
  }

  handleDeleteFolder (folderName) {
    const url = new URL(`${serverURL}/${folderName}`)
    const config = {method: 'DELETE', headers: authorizedHeader(this)}
    const stateBackup = this.state.emailList
    
    this.setState(prevState => {
      delete prevState.emailList[folderName]
      return {emailList: prevState.emailList, folderToDelete:'', currentFolder:'Inbox'}
    })

    fetchWithTimeOut(url, config, 15000)
    .then(res => res.json(), err => console.log('Cant parse response'))
    .then(
      res => {
        if (res.success) {
          console.log(`${folderName} deleted`)
        } else {
          this.setState({emailList: stateBackup})
          console.log(res.message)
        }
      },
      err => {
        console.log('Cant execute email move')
        this.setState({emailList: stateBackup})
      }
    )
  }
  
  handleReplyClick (status, email) {
    const subject = status === 'forward' ? 'Fwd: ' + email.subject  : 'Re: ' + email.subject 
    const updatedEmailReplyObj = {
      subject:subject,
      MessageID:'<new'+Date.now()+domainName+'>',
      attachments:email.attachments,
      from:{email:this.state.currentUser.email, name:this.state.currentUser.name}
    }
    this.setState(prevState => ({
      OpenEmailInData: email,
      ContentBoxStatus: 'EmailIn',
      replyEmailStatus: status,
      replyEmailObj: Object.assign({},prevState.replyEmailObj,updatedEmailReplyObj)
    }))
  }
  
  saveDraft(draft,type) {
    const emailType = type === 'replyEmailObj' ? 'ReplyEmail' : 'NewEmail'
    console.log('Start save draft')

    var DataToSend = {...draft}
    var message = new FormData()
    var attachments = []
    
    for(let attachment of DataToSend.attachments){
      if ('file' in attachment) {
        message.append('docs', attachment.file)
      }else {
        attachments.push(attachment)
      }
    }
    
    DataToSend.attachments = attachments
    message.append('textData', JSON.stringify(DataToSend))

    const url = new URL(`${serverURL}/draft`)
    const config = {method: 'PUT', body: message, headers: authorizedHeader(this)}

    fetchWithTimeOut(url, config, 7000)
    .then(res => res.json())
    .then(
      res => {
        if (res.success ) {
          this.savedIndShow(emailType)
          console.log(res.message)
        } else {
          console.log(res.message)
        }
      }, 
      error => console.log(error)
    )    
  
  } 

  savedIndShow (emailType) {
    this.setState(prevState => {
      const isSavedIndVisible = prevState.isSavedIndVisible
      isSavedIndVisible[emailType] = true
      return {isSavedIndVisible: isSavedIndVisible}
    })
    //this.savedIndTimer = setTimeout(() => this.savedIndHide(emailType), 4000)
  }

  savedIndHide (emailType) {
    this.setState(prevState => {
      const isSavedIndVisible = prevState.isSavedIndVisible
      isSavedIndVisible[emailType] =  false
      return {isSavedIndVisible: isSavedIndVisible}
    })
    //clearTimeout(this.savedIndTimer)
  } 

  handleCloseEmailClick (status) {
    const extendedStatus = {...status, replyEmailObj: this.defaultEmailState}
    this.setState(prevState => (extendedStatus))
  }


  handleNewEmail (status) {
    if(status === 'closed') {
      this.setState(prevState => ({
        newEmailStatus: status,
        newEmailObj: this.defaultEmailState
      }))
    }else {
      const updatedNewEmailObj = {
        MessageID:'<new'+Date.now()+domainName+'>',
        from:{name: this.state.currentUser.name, email: this.state.currentUser.email}
      }
      this.setState(prevState => ({
        newEmailStatus: status,
        newEmailObj: Object.assign({},prevState.newEmailObj,updatedNewEmailObj)
      }))
    }
    
  }

  notifcationShow(text){
    this.setState({notification:{body: text, isVisible: true}}, () => setTimeout(this.notificationStop, 2500))
  }

  notificationStop () {
    this.setState(prevState => ({
        notification: {body: '', isVisible: false}
      }))

    clearTimeout(this.notification)
  }

  progressBar(isVisible = true, progressPercent = ''){
    this.setState({progressBarStatus:{isVisible:isVisible, progress:progressPercent }})
  }

  handleExitClick() {
    this.setState({isLoggedIn: false})

    const url = new URL(`${serverURL}/logout`)
    const config = {method: 'GET', headers: authorizedHeader(this)}

    fetchWithTimeOut(url, config, 10000)
    .then(res => res.json())
    .then(res => console.log(res.message), err => console.log(err))   
  }


  render () {
    const blur = this.state.isLoading ? 'my-blur' : ''
    const loder = this.state.isLoading ? <Loader isLoading={this.state.isLoading} /> : null
    
    
    const notification = this.state.notification.isVisible
      ? <Notifications notification={this.state.notification} />
      : null
    
    const addFolder = this.state.isAddFolderVisible
      ? <AddFolder onCloseClick={this.handleAddFolderClick} onCreateFolderClick={this.handleCreateFolderClick} />
      : null
    const deleteConfirmation = this.state.folderToDelete !== ''
      ? <DeleteConfirmation 
        folder = {this.state.folderToDelete} 
        onCloseClick = {() => this.setState({folderToDelete:''})}
        onConfirmDeleteClick = {this.handleDeleteFolder}/>
      : null

    const progressLoder = this.state.progressBarStatus.isVisible
      ? <ProgressBar status={this.state.progressBarStatus} />
      : null
    
    const mainLoader = this.state.isAppLoaded
      ? null
      : <MainLoader screnType={this.state.screnType} 
        handleLoggedInState={this.updateLoggedInState}
        handleCurrentUserData = {this.updateCurrentUserData}
        handleFoldersInfo = {this.updateFoldersInfo}
        onLoadingComplete = {(status) => this.setState({isAppLoaded:status}) }/>
    
    const folder = this.state.currentFolder in this.state.emailList ? this.state.currentFolder : 'Inbox'

    const lastFolderUID = this.state.emailList[folder].UIDs.length 
      ? Math.min(...this.state.emailList[folder].UIDs)
      : 0
    const emailList = this.state.emailList[folder].emails.sort(
        (a,b) =>  new Date(b.receivingDate) - new Date(a.receivingDate) 
      )
    var lastShownEmailUID,firstShownEmailUID

    if (this.state.emailList[folder].UIDs.length > 0){
      lastShownEmailUID = getLastShownUID(this.state.emailList[folder].emails, this.state.emailList[folder].UIDs )
      firstShownEmailUID = getFirstShownUID(this.state.emailList[folder].emails, this.state.emailList[folder].UIDs )
    } else {
      lastShownEmailUID = 0
      firstShownEmailUID = 0
    }
        
    const ContentBox = this.state.ContentBoxStatus === 'EmailList' 
      ? <EmailList
        emailBatchToUpload = {this.state.emailBatchToUpload}
        currentFolder = {this.state.currentFolder}
        contentBoxMessage = {this.state.contentBoxMessage}
        emailList = {emailList}
        lastShownEmailUID = {lastShownEmailUID}
        firstShownEmailUID = {firstShownEmailUID}
        lastFolderUID = {lastFolderUID}
        isLoading = {this.state.isLoading}
        stepsBack =  {this.state.stepsBack}
        onCloseMessageClick = {() => this.setState({contentBoxMessage:''})}
        ContentBoxStatus = {this.state.ContentBoxStatus}
        onFolderMove = {this.handleMoveEmailToFolder}
        onClickEmailList = {this.handleEmailClick}
        onEmailListChange = {this.handleEmailListLoading}
        handleLoader = {(status) => this.setState( { isLoading:status } )}
        onDeleteEmailClick = {this.handleDeleteEmail}/>
      : <EmailIn
        currentFolder = {this.state.currentFolder}
        emailData = {this.state.OpenEmailInData}
        isSavedIndVisible = {this.state.isSavedIndVisible.ReplyEmail}
        attachments = {this.state.replyEmailObj.attachments}
        ContentBoxStatus = {this.state.ContentBoxStatus}
        replyEmailStatus = {this.state.replyEmailStatus}
        onEmailDataChange = {(email) => handleEmailObj(email,'replyEmailObj',this)}
        onSendClick = {(message)=>handleSendEmail(message, this)}
        onCloseClick = {this.handleCloseEmailClick}
        onFooterButtonClick = {this.handleReplyClick}
        onDeleteDraftClick = {this.handleDeleteDraft}/>
    
    const emailOut = this.state.newEmailStatus === 'open'
      ? <EmailOut 
        folder = {this.state.currentFolder}
        emailData = {this.state.newEmailObj}
        isSavedIndVisible = {this.state.isSavedIndVisible.NewEmail}
        onCloseClick = {this.handleNewEmail} 
        onDeleteDraftClick = {this.handleDeleteDraft} 
        onEmailDataChange = {(email)=>handleEmailObj(email,'newEmailObj', this)}
        onSendClick = {(message)=>handleSendEmail(message, this)} />
      : null
    
    const modal = this.state.modal.isVisible 
      ? <Modal 
        modal={this.state.modal} 
        onModalClose={() => this.setState({modal: this.defaultModalState})}/> 
      : null

    var  AppContent = null
    if(this.state.isAppLoaded){
      AppContent = this.state.isLoggedIn 
      ? <div className = {blur}>
          <SideBar
            inboxUnreaded = {this.state.emailList['Inbox'].unreaded}
            userInfo={this.state.currentUser}
            folder = {this.state.currentFolder}
            userFolders = {getUserFolders(this.state.emailList)}
            isInboxOpen = {this.state.isInboxOpen} 
            updateUnreaded = {(state)=>this.setState(state)}
            onDeleteFolderClick = {(folder) => this.setState({folderToDelete: folder})}
            onFolderChange = {this.handleCurrentFolder}
            onNewEmailClick = {this.handleNewEmail}
            onAddFolderClick = {this.handleAddFolderClick}
            onInboxCollapseClick = {this.handleInboxToogle}
            //this.updateLoggedInState
            onExitClick = {this.handleExitClick } />
          <div className='content'>
          <TopBar 
            isSearchVisible = {this.state.isSearchVisible}
            contentBoxStatus = {this.state.ContentBoxStatus}
            folder = {this.state.currentFolder} 
            screnType = {this.state.screnType}
            onSearchBarAction = {(searchState) => this.setState(searchState)}
            onSearch = {this.handleSearch}
            onEmptyTrash = {this.handleEmptyTrash}
            />
          <ErrorBoundary>
            {ContentBox}
          </ErrorBoundary>
          {emailOut}
          <NewMailButton className='my-hide-desktop' onNewEmailClick = {this.handleNewEmail} />
          </div>
        </div>
      : <LogIn 
        screnType={this.state.screnType} 
        handleLoggedInState = {this.updateLoggedInState} 
        handleCurrentUserData = {this.updateCurrentUserData}
        handleFoldersInfo = {this.updateFoldersInfo}
        onLoadingComplete={(status) => this.setState({isAppLoaded: status}) } />
    }
    

    return (
      <div className='full-width'>
        <React.StrictMode>
          <ScreenTypeContext.Provider value = {this.state.screnType}>
            <ControlsContext.Provider value = {this.handleControlsClick}>
              {AppContent}
              {/*<EmailItemDragLayer/>*/}
              {modal}
              {notification}
              {loder}
              {addFolder}
              {deleteConfirmation}
              {progressLoder}
              {mainLoader}
            </ControlsContext.Provider>
          </ScreenTypeContext.Provider>
        </React.StrictMode>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}
