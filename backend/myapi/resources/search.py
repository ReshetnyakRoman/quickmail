from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request, current_app as app
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.getEmailList import getDescretEmailList
from ..common.getSubFolders import getSubFolders
from ..common.searchEmails import searchEmails
from ..models.users import Users
from config import defaultFolders
from flask_restful import reqparse

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
  'UIDs': fields.List( fields.Integer, default=[] )
  }
 

class search(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def get(self):
    try:
      userID = request.headers.get('ID')
      if userID == get_jwt_identity():

        emailList = []
        allEemailsUIDs = []

        parser = reqparse.RequestParser()
        parser.add_argument('keyword', help='string we are search in email')
        args = parser.parse_args()
        print('\nSerching emails with keyword "{}"... '.format(args['keyword']))

        userInfo = Users.query.filter_by(userID=userID).first()     
        MAIL_USERNAME = userInfo.osUserName
        MAIL_PASSWORD = userInfo.password
        Mailbox =  makeNewIMAPconnection()
        Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
        folders = getSubFolders(Mailbox)
        folders.append(app.config['IMAP_SENT_FOLDER'])
        folders.append('INBOX')
        emailsUIDs = searchEmails(MAIL_USERNAME,MAIL_PASSWORD, app.config['IMAP_HOST'],args['keyword'], folders)

        for folder, emails in emailsUIDs.items():
          if len(emails):
            folderEmailList = getDescretEmailList(Mailbox, emails, folder, userID)
            emailList += folderEmailList
            allEemailsUIDs += emails

        Mailbox.logout()

        responseBody = {'success':True, 'message':'OK','folder':'Search', 'emailList':emailList, 'UIDs':allEemailsUIDs}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'User not authorized'}
        return responseBody, 400, {'Content-Type':'application/json'}
    except:
      print('Filed request')
      
      responseBody = {'success':False, 'message':'Incorrect data was sent'}
      return responseBody, 400, {'Content-Type':'application/json'}