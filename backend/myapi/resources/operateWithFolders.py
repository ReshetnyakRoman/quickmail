from flask_restful import Resource, fields, marshal_with, reqparse
from flask import request
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.createFolder import createFolder
from ..common.deleteFolder import deleteFolder
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import defaultFolders

resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  }



class operateWithFolders(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def post(self, folder):
    #Помнять строчки логина и пароля после тестирования
    MAIL_USERNAME = 'registration'
    MAIL_PASSWORD = 'Registration_2001'
    userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
    
    print(userInfo)
    #MAIL_USERNAME = userInfo.osUserName
    #MAIL_PASSWORD = userInfo.password
    
    if request.headers.get('ID') == get_jwt_identity():
      print('User with ID: {0} pass authentification to create folder {1}'.format(
        request.headers.get('ID'), folder) )

      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
      #we encode it to utf7, couse imap badly operate with non-ascii characters
      #folder = folder.encode('utf7')
      status = createFolder(Mailbox, folder)
      
      Mailbox.logout()
      if status:
        responseBody = {'success':True, 'message':'OK'}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'Error occure during new folder creation'}
        return responseBody, 400, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}

  @jwt_required
  @marshal_with(resource_fields)
  def delete(self, folder):
    #Помнять строчки логина и пароля после тестирования
    MAIL_USERNAME = 'registration'
    MAIL_PASSWORD = 'Registration_2001'
    userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
    
    print(userInfo)
    #MAIL_USERNAME = userInfo.osUserName
    #MAIL_PASSWORD = userInfo.password
    
    if request.headers.get('ID') == get_jwt_identity():
      print('User with ID: {0} pass authentification to delte folder {1}'.format(
        request.headers.get('ID'), folder) )

      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
      #we encode it to utf7, couse imap badly operate with non-ascii characters
      #folder = folder.encode('utf7')
      status = deleteFolder(Mailbox, folder)
      
      Mailbox.logout()
      if status:
        responseBody = {'success':True, 'message':'OK'}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'Error occure during folder removal'}
        return responseBody, 400, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}