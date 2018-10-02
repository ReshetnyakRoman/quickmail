import React from 'react'
import {userData, inboxData, draftData, emailListData, emailData} from './data/data'
import MyEditor from './draftJsEditor'

function SideBarStyling (props) {
  return (
    <aside className='my-color-dark side-bar justify-content-start d-flex flex-column'>
      {props.children}
    </aside>
  )
}

/* ===========SideBar=========== */
function SideBar (props) {
  return (
    <div>
      <MobileMenuIcon />
      <SideBarStyling>
        <div className='account-block'>
          <Avatar user={userData} type='circle' className='mx-auto my-4' />
          <AccountInfo email='temp84g@gmail.com' />
        </div>
        <NewMail />
        <SideBarMenu folder={props.folder} />
      </SideBarStyling>
    </div>
  )
}
function MobileMenuIcon () {
  return (
    <div className='mobile-menu-icon my-hide-desktop'>
      <div className='nav-icon'>
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
function Avatar (props) {
  const avatarType = props.type === 'circle' ? 'avatar-circle' : 'avatar-sqare'
  const imgUrl = props.user.avatar
    ? {backgroundImage: 'url(' + props.user.avatar + ')'}
    : {backgroundImage: 'url(/img/avatar.png)'}

  return (
    <div className={`${avatarType} ${props.className}`} style={imgUrl} />
  )
}

function AccountInfo (props) {
  return (
    <div className='my-account-info'>
      <div className='triangle' />
      <div className='my-account-info-settings'>
        <div className='account-text'>{props.email}</div>
        <div className='opt'>
          <Exit className='opt-item isAccount' />
          <div className='opt-item isSetting'>
            <svg>
              <circle cx='35%' cy='50%' r='2' />
              <circle cx='50%' cy='50%' r='2' />
              <circle cx='65%' cy='50%' r='2' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function Exit (props) {
  return (
    <span className={`${props.className} my-cursor-pointer`} onClick={() => null} alt='wright new email'>
      Exit
    </span>
  )
}
function SideBarMenu (props) {
  return (
    <div className='sidebar-menu'>
      <ul>
        <Inbox folder={props.folder} inbox={inboxData} />
        <Draft folder={props.folder.folder} draft={draftData} />
        <Sent folder={props.folder.folder} />
        <Trash folder={props.folder.folder} />
      </ul>
    </div>
  )
}

function NewMail (props) {
  return (
    <React.Fragment>
      <span
        className={`btn my-btn-primay my-4 mx-auto my-hide-mobile ${props.className}`}
        onClick={() => null}
        alt='wright new email'>
        New email
      </span>
      <span className='new-email-btn-small'>
        <i className='material-icons'>create</i>
      </span>
    </React.Fragment>
  )
}

function Inbox (props) {
  const inbox = props.inbox
  const unread = inbox.unread
  const folders = inbox.folders.map(
    function (folder) {
      const isActive = props.folder.subFolder === folder ? 'isActive' : ''
      return <li key={folder} className={isActive}><a href='#' >{folder}</a></li>
    }
  )
  const isInbox = props.folder.folder === 'Inbox' ? 'isActive' : ''

  return (
    <li className={`inboxItem ${isInbox}`}>
      <a href='#'>Inbox ({unread}) </a>
      <a data-toggle='collapse'
        href='.inbox-collapse'
        role='button'
        aria-expanded='false'
        aria-controls='inbox-collapse'
        className='arrow-left'
      >
        <i className='material-icons my-line-align-down ml-2'>arrow_right</i>
      </a>
      <ul className='inner-list collapse inbox-collapse' >
        <li className='pb-2' key='newfolder'>
          <a className='small my-text-blue my-cursor-pointer'>
            <i className='material-icons my-line-align-down'>add_box</i>
            &nbsp;new folder
          </a>
        </li>
        {folders}

      </ul>
    </li>
  )
}

function Draft (props) {
  const isActive = props.folder === 'Draft' ? 'isActive' : ''

  return (
    <li className={`draftItem ${isActive}`}>
      <a href='#'>Draft ({props.draft.drafts})</a>
    </li>
  )
}

function Sent (props) {
  const isActive = props.folder === 'Sent' ? 'isActive' : ''

  return (
    <li className={`sentItem ${isActive}`}>
      <a href='#'>Sent</a>
    </li>
  )
}

function Trash (props) {
  const isActive = props.folder === 'Trash' ? 'isActive' : ''

  return (
    <li className={`trashItem ${isActive}`}>
      <a href='#'>Trash</a>
    </li>
  )
}

/* ===========TopBar=========== */
function TopBar (props) {
  return (
    <div className='d-flex pr-1 py-2 mb-2 topbar align-items-center my-flex-align-center'>
      <Logo />
      <CurrentFolder folder={props.folder} className='my-hide-desktop my-font-size-sm mx-auto pr-1' />
      <SearchBar />
      <EmptyTrash folder={props.folder} />
    </div>
  )
}

function Logo () {
  return (
    <div className='logo mr-3 my-hide-mobile'>
      <img src='/img/Logo.png' alt='QuickMail' />
    </div>

  )
}

function EmptyTrash (props) {
  if (props.folder !== 'Trash') {
    return <span />
  }
  return (

    <span className='my-font-size-md my-tooltip my-btn-danger m-1'
      data-toggle='tooltip'
      data-placement='bottom'
      title='Empty trash'
      data-animation='true'
      data-delay='{ "show": 400, "hide": 100 }'>
      <i class='material-icons pt1-1'>
          delete_forever
      </i>
    </span>

  )
}

function SearchBar () {
  return (
    <React.Fragment>
      <i className='material-icons my-text-gray200 px-2'>search</i>
      <div className='full-width my-hide-mobile'>
        <form>
          <input type='text' aria-label='Search Email' placeholder='Search Email' className='search' />
        </form>
      </div>
    </React.Fragment>
  )
}

/* ===========EmailList=========== */
function EmailList (props) {
  const emails = emailListData.emaillist.map(email =>
    <li key={email.emailId}>
      <Email emailInfo={email} />
    </li>
  )

  return (
    <div>
      <CurrentFolder folder={props.folder} className='my-hide-mobile' />
      <ul className='list-unstyled'>
        {emails}
      </ul>
    </div>
  )
}

function CurrentFolder (props) {
  return (
    <div className={`${props.className}`}>
      <h3>{props.folder}</h3>
    </div>
  )
}

function EmailStyling (props) {
  return (
    <div className={`d-flex emailListItem mb-2`}>
      {props.children}
    </div>
  )
}

function Email (props) {
  return (
    <EmailStyling >
      <Avatar user={props.emailInfo} view='square' />
      <div className='d-flex flex-column emailInfo pl-2 py-2'>
        <MailFrom emailInfo={props.emailInfo} view='short' status={props.emailInfo.isUnreaded} />
        <Subject emailInfo={props.emailInfo} view='short' />
        <Snippet emailInfo={props.emailInfo} view='short' />
      </div>
      <div className='d-flex flex-column emailListItem-border-right my-flex-align-center'>
        <AttachmentIndicator emailInfo={props.emailInfo} className='pt-1' />
        <ReceivingDate emailInfo={props.emailInfo} view='short' className='align-self-stretch' />
      </div>
      <EmailControls view='short' status={props.emailInfo.isUnreaded} />

    </EmailStyling>
  )
}

function EmailControls (props) {
  let visibility = ''
  let positioning = 'email-controls'
  let unreaded = 'email', title = 'Mark unread'
  if (props.status) {
    unreaded = 'drafts'
    title = 'mark as readed'
  }

  if (props.view === 'short') {
    visibility = 'display-none'
    positioning = 'email-controls-short'
  }

  return (
    <div className={`${positioning}`}>
      <span >
        <i className='material-icons my-tooltip'
          data-toggle='tooltip'
          data-placement='top'
          title='Reply'
          data-animation='true'
          data-delay='{ "show": 400, "hide": 100 }'>reply</i>
      </span>
      <i className={`material-icons  ${visibility}`}
        data-toggle='tooltip'
        data-placement='top'
        title='Reply to All'
        data-animation='true'
        data-delay='{ "show": 400, "hide": 100 }'>reply_all</i>
      <i className='material-icons'
        data-toggle='tooltip'
        ata-placement='top'
        title='Delete email'
        data-animation='true'
        data-delay='{ "show": 400, "hide": 100 }'>delete</i>
      <i className='material-icons'
        data-toggle='tooltip'
        data-placement='top'
        title={title}
        data-animation='true'
        data-delay='{ "show": 400, "hide": 100 }'>{unreaded}</i>
    </div>
  )
}

function MailFrom (props) {
  const name = props.emailInfo.fromName ? props.emailInfo.fromName : props.emailInfo.from
  const isUnreaded = props.status ? '' : 'd-none'
  const showElem = ['d-none', '']
  const isFull = props.view === 'full' ? 1 : 0

  const fontWeight = ['font-weight-bold', '']
  return (
    <div className='mailFrom-block position-static'>
      <div className={`${fontWeight[isFull]} ${props.className} my-font-size-md shorten-text`}>
        <i className={`material-icons my-font-size-md mr-1 my-text-blue ${isUnreaded} ${showElem[!isFull]}`}>
        fiber_manual_record
        </i>
        <span className={`text-black-50 ${showElem[isFull]}`}>From: </span>
        <span >{name}</span>
      </div>
      <div className='mailFrom-popup small text-black-50'>
        e-mail:&nbsp;<span className='my-text-blue'>{props.emailInfo.from}</span>
      </div>
    </div>
  )
}

function Subject (props) {
  const subjText = props.view === 'full' ? 'Subject: ' : ''
  return (
    <div className={`${props.className} my-font-size-md shorten-text mt-1 `}>
      <span className='text-black-50'>{subjText}</span>{props.emailInfo.subject}
    </div>
  )
}

function Snippet (props) {
  return (
    <div className='my-font-size-md text-black-50  font-weight-light shorten-text'>
      {props.emailInfo.snippet}
    </div>
  )
}

function ReceivingDate (props) {
  const positioning = props.view === 'short'
    ? 'receivingDate-short align-items-center pr-2'
    : 'receivingDate'
  const date = props.view === 'short'
    ? props.emailInfo.receivingDate.toLocaleString('ru-RU', { month: 'short', day: 'numeric' })
    : props.emailInfo.receivingDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) + ', ' +
    props.emailInfo.receivingDate.toLocaleString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric' })

  return (
    <div className={`small text-black-50 d-flex ${positioning} ${props.className}`}>
      {date}
    </div>
  )
}
/* ===========Reply=========== */
function EmailReply (props) {
  return (
    <ScreenTypeContext.Consumer>
      {screnType =>
        <EmailInStyle>
          <EmailHeader emailInfo={props.emailData} />
          <EmailBody emailInfo={props.emailData} />
          <Attachments emailInfo={props.emailData} />
          <ReplySection emailInfo={props.emailData} screnType={screnType} />
        </EmailInStyle>
      }
    </ScreenTypeContext.Consumer>
  )
}

function ReplySection (props) {
  return (
    <div className='reply-section pb-1 d-flex flex-column'>
      <EmailOutTitle screnType={props.screnType} type='reply' />
      <ReplyTo emailInfo={props.emailInfo} className='responsive-margin-x responsive-margin-t mb-1' />
      <CopyTo emailInfo={props.emailInfo} type='reply' className='responsive-margin-x' />
      <MyEditor className='responsive-margin-x responsive-margin-y' />
      <EmailOutFooter screnType={props.screnType} />
    </div>
  )
}

function ReplyTo (props) {
  return (
    <div className={`reply-to d-flex ${props.className}`}>
      <span className='small text-black-50'>Reply to:&nbsp;</span>
      <MailFrom emailInfo={props.emailInfo} view='small' className='small' />
    </div>
  )
}

/* ===========EmailIn=========== */
function EmailInStyle (props) {
  return (
    <div className='relative shadow-sm emailIn-style'>
      {props.children}
    </div>
  )
}

function EmailIn (props) {
  return (
    <EmailInStyle>
      <EmailHeader emailInfo={props.emailData} />
      <EmailBody emailInfo={props.emailData} />
      <Attachments emailInfo={props.emailData} />
      <Footer />
    </EmailInStyle>
  )
}

function EmailHeader (props) {
  return (
    <header className='p-2'>

      <div className='full-width '>
        <EmailControls view='full' />
      </div>

      <div className='d-flex p-1'>
        <Avatar user={props.emailInfo} view='square' className='mr-2 mt-1' />
        <div className='full-width position-relative d-flex flex-column my-space-between'>

          <div className='position-relative mb-1'>
            <MailFrom emailInfo={props.emailInfo} view='full' className='small' />
            <ReceivingDate emailInfo={props.emailInfo} view='full'
              className='float-right reciving-date-mobile' />
          </div>
          <AttachmentIndicator emailInfo={props.emailInfo} className='attachments-ind-position' />
          <CollapseDetails />
          <div className='my-hide-mobile'>
            <MailTo emailInfo={props.emailInfo} />
            <CopyTo emailInfo={props.emailInfo} />
          </div>
          <Subject emailInfo={props.emailInfo} view='full' className='' />

        </div>
      </div>

    </header>
  )
}

function EmailBody (props) {
  return (
    <div className='p-2 m-2'>
      {props.emailInfo.text}
    </div>
  )
}
function CollapseDetails () {
  return (
    <div className='my-hide-desktop small collapse-details'>
      <span className='text-black-50'>To: </span>
      <span className='my-text-blue'>
        show details
        <i className='material-icons small my-line-align-down'>arrow_drop_down</i>
      </span>
    </div>
  )
}
function CopyTo (props) {
  if (props.emailInfo.cc.length == 0) {
    return <span />
  }

  const close = props.type === 'reply'
    ? <span className='my-cursor-pointer px-2 my-font-size-md'>
          &nbsp;&times;
    </span>
    : ''

  const names = props.emailInfo.cc.map(function (person, index) {
    const mainInfo = person.name ? person.name : person.email
    const coma = index === props.emailInfo.cc.length - 1 ? '' : ', '

    return (
      <p className='d-inline-block m-0 mailFrom-block position-relative'>
        <span className='badge badge-light'>
          {mainInfo}
          {close}
        </span>
        <div className='mailFrom-popup small text-black-50'>
          email:&nbsp;<span className='my-text-blue'>{person.email}</span>
        </div>
        {coma}&nbsp;
      </p>)
  })

  return (
    <div className={`${props.className} my-font-size-md mb-1`}>
      <span className='text-black-50'>Copy: </span>{names}
    </div>
  )
}

function MailTo (props) {
  const names = props.emailInfo.cc.map(function (person, index) {
    const mainInfo = person.name ? person.name : person.email
    const coma = index === props.emailInfo.cc.length - 1 ? '' : ', '
    return (
      <p className='d-inline-block m-0 mailFrom-block position-relative'>
        <span className='badge badge-light'>{mainInfo}</span>
        <div className='mailFrom-popup small text-black-50'>
          email:&nbsp;<span className='my-text-blue'>{person.email}</span>
        </div>
        {coma} &nbsp;
      </p>)
  })

  return (
    <div className='my-font-size-md'>
      <span className='text-black-50 my-hide-mobile'>To: </span>{names}

    </div>
  )
}

function AttachmentIndicator (props) {
  const visibility = props.emailInfo.attachments ? '' : 'd-none'
  return (
    <div className={`${props.className} attachments-ind ${visibility}`}>
      <i className='material-icons my-font-size-lg'>attachment</i>
    </div>
  )
}

function Attachments (props) {
  if (props.emailInfo.attachments) {
    const attachments = props.emailInfo.attachments.map(file =>
      <div className='my-attach-card'>

        <div className='icon'>
          <i class='material-icons'>
          attachment
          </i>
        </div>
        <div className='card-footer'>{file.name}</div>

        <div className='overlay'>
          <p>{file.name}</p>
          <i class='material-icons'>
          cloud_download
          </i>
          <p className='my-font-size-sm'>Download ({file.size})</p>
        </div>
      </div>
    )
    return (
      <div className=''>
        <hr className='my-hr' />
        <div className='d-flex'>
          {attachments}
        </div>
      </div>
    )
  }

  return (
    <div />
  )
}

function Footer () {
  return (
    <footer className='m-2 d-flex emailIn-footer'>
      <button type='button' className='btn my-btn-outline-dark'>
        <i className='material-icons'>reply</i>
        <span className='align-top my-hide-mobile'>&nbsp;Reply</span>
      </button>
      <button type='button' className='btn my-btn-outline-dark'>
        <i className='material-icons'>reply_all</i>
        <span className='align-top my-hide-mobile'>&nbsp;Reply to all</span>
      </button>
      <button type='button' className='btn my-btn-outline-dark'>
        <i className='material-icons'>forward</i>
        <span className='align-top my-hide-mobile' >&nbsp;Forward</span>
      </button>
    </footer>
  )
}

/* ===========EmailOut=========== */
function EmailOutStyle (props) {
  return (
    <div className='border relative shadow-sm mb-2 pb-2'>
      {props.children}
    </div>
  )
}

function EmailOut () {
  return (
    <ScreenTypeContext.Consumer>
      {screnType =>
        <EmailOutStyle >
          <EmailOutHeader screnType={screnType} />
          <EmailOutBody screnType={screnType} />
          <AttachedDocs attachments={[{name: 'file1.xls', size: '50KB'}, {name: 'file2.doc', size: '5MB'}]} />
          <EmailOutFooter screnType={screnType} />
        </EmailOutStyle>
      }
    </ScreenTypeContext.Consumer>
  )
}

function EmailOutHeader (props) {
  return (
    <header>
      <EmailOutTitle screnType={props.screnType} />
      <div className='mx-4'>

        <div className='d-flex mb-1 border-bottom'>
          <div className='my-text-gray600 my-email-header-input-prepend'>
            <span >To &nbsp;</span>
          </div>
          <input
            type='text'
            className='my-email-header-input'
            name='to' />
          <div
            className='my-text-gray600 my-email-header-input-prepend'
            data-toggle='tooltip'
            data-placement='right'
            title='Add recipient on copy'>
            <span className='my-cursor-pointer my-hover-underline'>Copy &nbsp;</span>
          </div>
        </div>

        <div className='d-flex mb-1 border-bottom'>
          <div className='my-text-gray600 my-email-header-input-prepend'>
            <span >Copy &nbsp;</span>
          </div>
          <input
            type='text'
            className='my-email-header-input'
            name='copy' />
        </div>

        <div className='d-flex mb-1 border-bottom'>
          <input
            type='text'
            className='my-email-header-input'
            placeholder='Subject'
            name='subject' />
        </div>
      </div>
    </header>
  )
}
function EmailOutTitle (props) {
  const [show, titleStyle] = props.type === 'reply' ? ['d-none', 'emailOutTitleReply'] : ['', 'emailOutTitle']
  if (props.screnType !== 'desktop') {
    return (
      <div
        className={`d-flex justify-content-around align-items-baseline my-color-blue ${titleStyle}`}>
        <Send screnType='props.screnType' />
        <AttachFile screnType='props.screnType' />
        <DeleteDraft screnType='props.screnType' />
        <CloseEmail screnType='props.screnType' />
      </div>
    )
  }

  return (
    <p className={`my-color-dark px-4 py-2 ${show}`}>
        New message
      <span className='float-right my-font-size-xl my-line-align-up'>&times;</span>
    </p>
  )
}
function EmailOutBody (Props) {
  return (
    <div className='mx-4 my-4 my-full-height'>
      <MyEditor />
    </div>
  )
}
function AttachedDocs (props) {
  const attachments = props.attachments.map(file =>
    <p className='font-weight-bold border m-1 attached-doc align-items-center justify-content-between px-1 my-font-size-md d-flex flex-nowrap' >
      <span>{file.name}&nbsp;</span>
      <span className='text-black-50'>({file.size})</span>
      <span className='pl-3 my-cursor-pointer'>&times;</span>
    </p>
  )
  return (
    <div className='d-flex px-4 my-2 flex-wrap'>
      {attachments}
    </div>
  )
}
function EmailOutFooter (props) {
  const isDesktop = props.screnType === 'desktop' ? 1 : 0
  const visible = ['d-none', '']

  return (
    <footer className={`py-2 px-4 ${visible[isDesktop]}`} >
      <Send screnType={props.screnType} />
      <AttachFile screnType={props.screnType} />
      <DeleteDraft screnType={props.screnType} />
    </footer>
  )
}

function Send (props) {
  if (props.screnType !== 'desktop') {
    return (
      <span className='my-cursor-pointer'
        data-toggle='tooltip'
        data-placement='top'
        title='Send email'>
        <i class='m-1 material-icons text-black-50 my-line-align-down'>
          send
        </i>
      </span>
    )
  }
  return (
    <button type='button' className='btn my-send-button'>
      Send
    </button>
  )
}

function AttachFile (props) {
  return (
    <span className='my-cursor-pointer attachFile mx-3'
      data-toggle='tooltip'
      data-placement='top'
      title='attach file'>
      <i class='my-1 material-icons text-black-50 my-line-align-down '>
      attach_file
      </i>
    </span>
  )
}

function DeleteDraft (props) {
  return (
    <span className='my-cursor-pointer deleteDraft'
      data-toggle='tooltip'
      data-placement='top'
      title='delete draft'>

      <i class='material-icons text-black-50 my-line-align-down '>
        delete_forever
      </i>

    </span>
  )
}

function CloseEmail (props) {
  return (
    <span className='my-cursor-pointer deleteDraft'
      data-toggle='tooltip'
      data-placement='top'
      title='close'>

      <i class='material-icons text-black-50 my-line-align-down'>
        close
      </i>

    </span>
  )
}

/* ===========Modals and Notifications=========== */

function AddFolder () {
  return (
    <div className='my-modal-backdraw-white d-none'>
      <div className='my-addFolder'>
        <span className='my-display-topright px-2 py-1 my-font-size-lg my-hover-dark my-cursor-pointer'>
          &times;
        </span>
        <input type='text'
          name='neaFolder'
          aria-label='new folder' className=''
          placeholder='Folder Name' />
        <div className='text-center'>
          <button className='btn my-btn-success'>Create</button>
        </div>
      </div>
    </div>
  )
}

function Notifications (props) {
  const visibility = props.notification.isVisible ? '' : 'd-none'
  return (
    <div className={`my-notification ${visibility}`}>
      <span className='my-font-size-md'>{props.notification.body}</span>
    </div>
  )
}

function Loader (props) {
  const show = props.isLoading ? 'd-flex' : 'd-none'
  return (
    <div className={`my-loader-container ${show}`}>
      <div class='loader'>
        <span>Loading...</span>
      </div>
    </div>
  )
}

function ProgressBar (props) {
  const visibility = props.status.isVisible ? '' : 'd-none'
  const progress = props.status.progress

  return (
    <div className={`my-myprogress ${visibility}`}>
      <div className='progress'>
        <div
          className='progress-bar progress-bar-striped progress-bar-animated'
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemin='0'
          aria-valuemax='100'
          style={{width: `${progress}%`}} >
          {progress}%
        </div>
      </div>

    </div>
  )
}
function MainLoader (props) {
  const progress = props.screnType === 'desktop' ? Math.floor(props.progress * 600) : Math.floor(props.progress * 260)
  const width = {width: progress + 'px'}
  return (
    <div className='main-loader flex-column d-none'>

      <div className='loader-container '>
        <div className='envelope'>
          <div className='envelope-left' />
          <div className='envelope-right' />
        </div>
        <div className='envelope-content' />
        <div className='envelope-top' />
      </div>
      <div className='progress' style={{height: '2px'}}>
        <div className='progress-bar'
          role='progressbar'
          style={width}
          aria-valuenow='100'
          aria-valuemin='0'
          aria-valuemax='100' />
      </div>
    </div>
  )
}

function LogIn () {
  return (
    <div className='login d-none'>
      <div className='gradient' />
      <div className='login-inner'>
        <div className='login-content'>
          <p className='pb-5'>
            <span>
              <span className='welcometext'>Welcome to</span> <br />
              <span className='logo'>
                <span className='logo-red'>Q</span>uick<span className='logo-blue'>M</span>ail
              </span>
            </span>

          </p>
          <button class='btn-fb'>
            Login with
            <img src='./img/facebook-logo.png' />
          </button>
          <hr className='log-in-hr' />

          <button class='btn-vk'>
            Login with
            <img src='./img/vk-logo.svg' />
          </button>

          <div className='about-block position-relative'>About project
            <div className='about-popup'>"QuickMail" is one more mail-service for you!
            <ul className=''>
            <li>It's free</li>
            <li>No registration, simply login with your socials</li>
            <li>Clean & Simple Descktop and Mobile interface</li>

          </ul>

          </div>

          </div>
        </div>
      </div>

    </div>
  )
}

const ScreenTypeContext = React.createContext('desktop')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      screen: {width: 0, height: 0},
      screnType: 'desktop',
      isLoading: false,
      progressBarStatus: {isVisible: false, progress: 75},
      currentFolder: {folder: 'Inbox', subFolder: ''},
      notification: {body: 'Message sent', isVisible: false},
      mainContentBoxStatus: 'emailList'
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
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

  render () {
    const blur = this.state.isLoading ? 'my-blur' : ''
    return (
      <div className='full-width '>
        <ScreenTypeContext.Provider value={this.state.screnType}>
          <div className={blur}>
            <SideBar folder={this.state.currentFolder} />
            <div className='content'>
              <TopBar folder={this.state.currentFolder.folder} />
              <EmailList folder={this.state.currentFolder.folder} />
              <EmailReply emailData={emailData} />
              <EmailIn emailData={emailData} />
              <EmailOut />
              <NewMail className='my-hide-desktop' />
            </div>
          </div>

          <AddFolder />
          <Notifications notification={this.state.notification} />
          <Loader isLoading={this.state.isLoading} />
          <ProgressBar status={this.state.progressBarStatus} />
          <MainLoader screnType={this.state.screnType} progress={1.0} />
          <LogIn screnType={this.state.screnType} />
        </ScreenTypeContext.Provider>
      </div>
    )
  }
}

export default App
