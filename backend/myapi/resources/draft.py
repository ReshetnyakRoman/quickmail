from flask_restful import Resource, reqparse, fields, marshal_with
from flask import jsonify, json, request, current_app
from ..common.saveDraft import saveDraft
from ..common.deleteDraft import deleteDraft
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.users import Users
from ..common.IMAPMailbox import makeNewIMAPconnection
import base64

resource_fields={
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Some problems at server side'),
}

class draft(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def put(self):
    #try:
      email = json.loads(request.form['textData'])
      print(email)
      if request.files.getlist('docs'):
        email['attachedFiles'] = request.files.getlist('docs')
        print(request.files.getlist('docs'))
      
      if request.headers.get('ID') == get_jwt_identity():
        #Помнять строчки логина и пароля после тестирования
        MAIL_USERNAME = 'registration'
        MAIL_PASSWORD = 'Registration_2001'
        userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
        print(userInfo)
        #MAIL_USERNAME = userInfo.osUserName
        #MAIL_PASSWORD = userInfo.password

        draftFolder = current_app.config['IMAP_DRAFT_FOLDER']

        Mailbox =  makeNewIMAPconnection()
        Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)

        success = saveDraft(Mailbox, email, draftFolder) 
        Mailbox.logout()

        message = 'Draft saved' if success else 'Cant save draft' 
        responseBody = {'success':success, 'message':message}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'User not authorized'}
        return responseBody, 400, {'Content-Type':'application/json'}
    #except:
    #  print('Incorrect data was sent')
    # 
    #  responseBody = {'success':False, 'message':'Incorrect data was sent'}
    #  return responseBody, 400, {'Content-Type':'application/json'}

  @jwt_required
  @marshal_with(resource_fields)
  def delete(self, draftMessageID):
    try:
      if request.headers.get('ID') == get_jwt_identity():
        #Помнять строчки логина и пароля после тестирования
        MAIL_USERNAME = 'registration'
        MAIL_PASSWORD = 'Registration_2001'
        userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
        print(userInfo)
        #MAIL_USERNAME = userInfo.osUserName
        #MAIL_PASSWORD = userInfo.password

        draftFolder = current_app.config['IMAP_DRAFT_FOLDER']
        decodedDraftID = base64.b64decode(draftMessageID)
        print(decodedDraftID)
        Mailbox =  makeNewIMAPconnection()
        Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
        success = deleteDraft(Mailbox, decodedDraftID, draftFolder) 
        Mailbox.logout()

        message = 'Draft deleted' if success else 'Cant delete draft' 
        responseBody = {'success':success, 'message':message}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'User not authorized'}
        return responseBody, 400, {'Content-Type':'application/json'}
    except:
      print('Request failed, Incorrect data was sent')
      
      responseBody = {'success':False, 'message':'Incorrect data was sent'}
      return responseBody, 400, {'Content-Type':'application/json'}

        


