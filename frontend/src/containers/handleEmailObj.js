export default function handleEmailObj(obj,type='replyEmailObj',component,) {
    const emailType = type === 'replyEmailObj' ? 'ReplyEmail' : 'NewEmail'
    const prevSubject = component.state[type].subject
    const prevBody = component.state[type].body
    
    component.setState(
      function(prevState){
        if (obj.attachments !== undefined) {
          var oldAttachListNames = []
          var oldAttachList = []
          for (let file of prevState[type].attachments) {
            oldAttachListNames.push(file.name)
            oldAttachList.push(file)
          }

          var isNewFileAdded = true

          if (obj.attachments.length === 0) isNewFileAdded = false

          for (let file of obj.attachments){
            if(oldAttachListNames.indexOf(file.name) !== -1){
              continue
            }else{
              oldAttachList.push(file)
            }
          }

          if(isNewFileAdded){
            obj.attachments = oldAttachList
          }
          
        }
        if(obj.delete !== undefined) {
          let attachments = prevState[type].attachments.slice()
          for (let i in attachments){
            if (attachments[i].name = obj.delete ){
              attachments.splice(i, 1)
              break
            }
          }
          prevState[type].attachments = attachments
        }
        return {[type]: Object.assign({}, prevState[type], obj)}
      },()=>{
        
        if (obj.body !== undefined 
          && obj.body !== '<p><br></p>' 
          && obj.body !== prevBody 
          || obj.subject !== undefined 
          && obj.subject !== prevSubject) {
            component.savedIndHide(emailType)
            component.saveDraftDebounced(component.state[type],type)
        }else if (obj.attachments !== undefined || obj.to !== undefined || obj.cc !== undefined ) {
          component.saveDraft(component.state[type],type)
        }
        
      } )
  }