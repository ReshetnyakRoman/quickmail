from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.getEmailList import getEmailList
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import reqparse
from config import defaultFolders

email_list = {
      'emailId': fields.Integer,
      'MessageID':fields.String,
      'from': fields.Nested( {'email':fields.String, 'name':fields.String(default='')} ) ,
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
      'isUnreaded': fields.Boolean(default=False),
      'snippet': fields.String(default=''),
    }


resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  'emailList': fields.List( fields.Nested(email_list) ),
  'folder': fields.String(default='INBOX'),
  'lastUID': fields.Integer,
  'UIDs': fields.List( fields.Integer, default=[] )
  }
 

class emailList(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def get(self, folder):
    #Помнять строчки логина и пароля после тестирования
    #try:      
      parser = reqparse.RequestParser()
      parser.add_argument('lastShownEmail',type=int, help='last (oldest) email visible user Mailbox')
      parser.add_argument('stepsBack',type=int, help='number of emails to get starting back from lastShownEmail UID')
      parser.add_argument('folder', help='Folder we are interested in')
      args = parser.parse_args()

      userID = request.headers.get('ID')
      userInfo = Users.query.filter_by(userID=userID).first()
      MAIL_USERNAME = userInfo.osUserName
      MAIL_PASSWORD = userInfo.password
      
      IMAPfolderName = defaultFolders[folder] if folder in defaultFolders else folder
      
      if userID == get_jwt_identity():
        print('\n----------------GET EMAIL LIST-----------------------')
        Mailbox =  makeNewIMAPconnection()
        Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
        (eamilList,lastUID) = getEmailList(Mailbox, args['lastShownEmail'], args['stepsBack'],IMAPfolderName,userID)
        Mailbox.select_folder(IMAPfolderName)
        allEemailsUIDs = Mailbox.search()
        Mailbox.unselect_folder()
        Mailbox.logout()

        responseBody = {'success':True, 'message':'OK','folder':folder, 'emailList':eamilList, 'lastUID':lastUID,'UIDs':allEemailsUIDs}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'User not authorized'}
        return responseBody, 400, {'Content-Type':'application/json'}
    #except:
    #  print('Filed request')
    #  responseBody = {'success':False, 'message':'Incorrect data was sent'}
    #  return responseBody, 400, {'Content-Type':'application/json'}