function getUIDlist (emailList) {
      var UIDlist = []
      for (let email of emailList) {
        UIDlist.push(email.emailId)
      }
      return UIDlist
    }
export default getUIDlist