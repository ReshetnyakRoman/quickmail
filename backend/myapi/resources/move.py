from flask_restful import Resource, fields, marshal_with, reqparse
from flask import request
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.moveToFolder import moveToFolder
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import defaultFolders

resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  'newUID': fields.Integer
  }

class move(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def put(self, folder, uid, newfolder):
    #Помнять строчки логина и пароля после тестирования
    #MAIL_USERNAME = 'registration'
    #MAIL_PASSWORD = 'Registration_2001'
    userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
    
    MAIL_USERNAME = userInfo.osUserName
    MAIL_PASSWORD = userInfo.password

    fromFolderName = defaultFolders[folder] if folder in defaultFolders else folder
    toFolderName = defaultFolders[newfolder] if newfolder in defaultFolders else newfolder

    if request.headers.get('ID') == get_jwt_identity():
      print('User with ID: {0} pass authentification to move email UID {1} from {2} to {3}'.format(
        request.headers.get('ID'), uid, fromFolderName, toFolderName) )

      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)

      if moveToFolder(Mailbox, fromFolderName, toFolderName, uid):
        Mailbox.select_folder(toFolderName)
        newUID = Mailbox.search()[-1]
        Mailbox.unselect_folder()
        Mailbox.logout()

        responseBody = {'success':True, 'message':'OK', 'newUID':newUID}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        Mailbox.logout()
        
        responseBody = {'success':False, 'message':'Problem during email movement'}
        return responseBody, 400, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}