from flask_restful import Resource, fields, marshal_with, reqparse
from flask import request, current_app 
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.deleteMails import deleteMails
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import defaultFolders

resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  }



class deleteEmail(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def delete(self, uid=None):
    #Помнять строчки логина и пароля после тестирования
    MAIL_USERNAME = 'registration'
    MAIL_PASSWORD = 'Registration_2001'
    userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
    
    print(userInfo)
    #MAIL_USERNAME = userInfo.osUserName
    #MAIL_PASSWORD = userInfo.password

    trashFolder = current_app.config['IMAP_TRASH_FOLDER'] 
    
    if request.headers.get('ID') == get_jwt_identity():
      print('User with ID: {0} pass authentification delte email UID {1}'.format(
        request.headers.get('ID'), uid) )

      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)

      status = deleteMails(Mailbox, uid, trashFolder)
      
      Mailbox.logout()
      if status:
        responseBody = {'success':True, 'message':'OK'}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'Error occure during emails removal'}
        return responseBody, 400, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request:Incorrect data was sent')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}