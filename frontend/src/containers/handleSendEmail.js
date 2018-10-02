import EmailValidation from '../containers/EmailValidation'
import authorizedHeader from '../containers/authorizedHeader'
import serverURL from '../config'

export default function handleSendEmail(type, app) {
    const emailType = type === 'NewEmail'  ? 'newEmailObj' : 'replyEmailObj'
    const email = {...app.state[emailType]}
    //check that there is at least one recipints and they all valid

    if(email.to.length === 0 && email.cc.length === 0){
      app.setState({
        modal: {
          header:'Error', 
          body:'Please add at least on recipient', 
          footer:'', 
          closeButtonText:'OK', 
          isVisible: true
        }
      })
    }
    else {
      const persons = [...email.to, ...email.cc]
      var isAllEmailValid =  true
      for (let person of persons) {
        if( !(EmailValidation(person.email)) ){
          isAllEmailValid = false
          break
        }
      }
      //const isAllEmailValid =  persons.map(person => {EmailValidation(person.email)}).reduce((a,b) => a && b)
      //const isAllEmailValid =  email.to.concat(email.cc).map(person => {EmailValidation(person.email)}).reduce((a,b) => a && b)

      if (!isAllEmailValid) {
        app.setState({
        modal: {
          header:'Error', 
          body:'There is invalid email address', 
          footer:'', 
          closeButtonText:'OK', 
          isVisible: true
        }
      })
      } 
      else {
        app.progressBar()
        
        var DataToSend = {...email}
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

        fetch(`${serverURL}/send`, 
        {
            method: 'post',
            headers: authorizedHeader(app),
            body: message,
        })
        .then(res => res.json(), error => alert(error + ' 1'))
        .then(res => {
          app.progressBar(false)
          if (res != null ) app.notifcationShow(res.message)
        })
        .then(app.setState(prevState => {
          var emails = prevState.emailList['Draft'].emails
          for (let draftInd in emails){
            if (emails[draftInd].MessageID === email.MessageID) {
              emails.splice(draftInd,1)
              break
            }
          }
          prevState.emailList['Draft'].emails = emails
          return {emailList: prevState.emailList}
        }))
        .then(app.updateMailBoxInfo())
        .catch(error => alert(error + ' final'))
        
        if (type === 'NewEmail') {
          app.setState(
            {newEmailStatus:'closed', newEmailObj:app.defaultEmailState}
          )
        }else {
          app.handleCloseEmailClick(
            {replyEmailStatus:'none', ContentBoxStatus:'EmailList', [emailType]:app.defaultEmailState}
          )
        }
      }
    }
  }