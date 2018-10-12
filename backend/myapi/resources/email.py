from flask_restful import Resource, fields, marshal_with, reqparse
from flask import request
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.getEmail import getEmail
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import defaultFolders

emailObj = {
      'emailId': fields.Integer,
      'MessageID':fields.String,
      'from': fields.Nested( {'email':fields.String, 'name':fields.String(default='')} ),
      'cc': fields.List( fields.Nested( {'email':fields.String, 'name':fields.String(default='')} ,default=[]) ),
      'to': fields.List( fields.Nested( {'email':fields.String, 'name':fields.String(default='')} ,default=[]) ),
      'subject': fields.String(default=''),
      'receivingDate': fields.DateTime,
      'body': fields.String(default=''),
      'attachments':fields.Nested( {
        'name':fields.String, 
        'path':fields.String(default=''), 
        'url':fields.String(default=''), 
        'size':fields.Integer
        } ),
      'avatar':fields.String(default=''),
    }

resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  'email': fields.Nested(emailObj),
  }



class email(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def get(self, folder, uid):
    #Помнять строчки логина и пароля после тестирования
    #MAIL_USERNAME = 'registration'
    #MAIL_PASSWORD = 'Registration_2001'

    userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
    print(userInfo)
    MAIL_USERNAME = userInfo.osUserName
    MAIL_PASSWORD = userInfo.password
    parser = reqparse.RequestParser()
    parser.add_argument('keepUnseen', help='flasg to keep message unseen')
    args = parser.parse_args()
    keepUnseen = False if args['keepUnseen'] == 'false' else True

    IMAPfolderName = defaultFolders[folder] if folder in defaultFolders else folder
    
    if request.headers.get('ID') == get_jwt_identity():
      print('User with ID: {0} pass authentification to get email UID {1}'.format(request.headers.get('ID'), uid) )
      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)

      (status, email) = getEmail(Mailbox, IMAPfolderName, uid, keepUnseen)
      Mailbox.logout()
      if status:
        responseBody = {'success':True, 'message':'OK','email':email}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'Problem during reading email from server'}
        return responseBody, 400, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}