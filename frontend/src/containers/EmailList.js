import React from 'react'
import EmailListItem from '../containers/EmailListItem'
import {Motion, spring} from 'react-motion'
import config from '../presentationals/AnimationConfig'

export default class EmailList extends React.Component {
  constructor (props) {
    super(props)
    this.handleEmailClick = this.handleEmailClick.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
    this.handleCloseMessageClick = this.handleCloseMessageClick.bind(this)
  }

  handleEmailClick (emailId) {
    this.props.onClickEmailList(emailId)
  }

  handleLoadMoreClick (){
    this.props.handleLoader(true)
    this.props.onEmailListChange(this.props.currentFolder)
  }

  componentDidMount() {
    if(this.props.emailList.length === 0){
      this.props.handleLoader(true)
      this.props.onEmailListChange(this.props.currentFolder)
    }
    
  }

  componentDidUpdate (prevProps) {
    if (this.props.currentFolder !== prevProps.currentFolder 
        //&& this.props.emailList.length === 0
        && this.props.emailList.length < this.props.emailBatchToUpload
        && this.props.lastShownEmailUID > this.props.lastFolderUID 
        && this.props.firstShownEmailUID !== 0)
    {
      this.props.handleLoader(true)
      this.props.onEmailListChange(this.props.currentFolder)
    }
  }

  handleCloseMessageClick () {
    this.props.onCloseMessageClick()
  }

  render() {
  const emailListStyle = this.props.ContentBoxStatus === 'EmailList' ? 'email-list-show' : 'email-list-hide'
  var emailList = this.props.emailList
  var emptyMessage = this.props.currentFolder === 'Search' 
    ? 'Oops, Nothing was found :('
    : 'There are no e-mails in this folder'

  const  emails = emailList.length === 0 && this.props.isLoading === false && this.props.contentBoxMessage === ''
      ? <p className='text-black-50' style={{textAlign:'center'}}>{emptyMessage}</p>
      : emailList.map(email =>
        <li key={email.emailId}>
          <EmailListItem onFolderMove={(uid,folder)=>this.props.onFolderMove(uid,folder)} emailInfo={email} onEmailClick={(e) => this.handleEmailClick(email.emailId)} folder={this.props.currentFolder}/>
        </li>
        )
  

  const message = this.props.contentBoxMessage !== '' 
    ? <div className = 'warnig-message'> 
        {this.props.contentBoxMessage} 
        <span style={{float:'right', fontSize:'20px', cursor:'pointer'}} onClick={()=>this.handleCloseMessageClick()}>&times;</span>
      </div>
    : null

  const loadMore = this.props.lastShownEmailUID > this.props.lastFolderUID
    ? <span  
        className='btn my-btn-primay-bordered my-4 mx-auto' 
        onClick={(e) => this.handleLoadMoreClick()}
        alt='Load more emails'>
        Load more >>
      </span>
    : null

  return (
    <Motion defaultStyle={{x: -100}} style={{ x: spring(0, config.emailListConfig) }}>
      { ({x}) =>
        <div className={emailListStyle} style={{transform: `translateX(${x}%)`}}>
          {message}
          <ul className='list-unstyled'>
            {emails}
          </ul>
          {loadMore}
        </div>
      }
    </Motion>
  )}
}
