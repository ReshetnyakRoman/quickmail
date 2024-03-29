from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.getFolders import getFolders
from ..common.getFolderInfo import getFolderInfo
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import defaultFoldersReversed as defaultFoldersNames

folder_info = {
  'folder':fields.String(default=''), 
  'unreaded':fields.Integer,
  'UIDs': fields.List( fields.Integer, default=[] )
}

resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  'folders': fields.List( fields.Nested(folder_info) )
  }


class updateMailBoxData(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def get(self):

    if request.headers.get('ID') == get_jwt_identity():

      userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
      MAIL_USERNAME = userInfo.osUserName
      MAIL_PASSWORD = userInfo.password      
      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
      foldersNames = getFolders(Mailbox)

      foldersWithInfo = []
      for folder in foldersNames:
        folderInfo = getFolderInfo(Mailbox,folder)
        foldersWithInfo.append({
            'folder': defaultFoldersNames[folder] if folder in defaultFoldersNames else folder,
            'unreaded': folderInfo[1],
            'UIDs':folderInfo[2]
          })

      Mailbox.logout()
      print('\nData for update {} mailbox successfully collected.\n'.format(MAIL_USERNAME))
      responseBody = {'success':True, 'message':'OK','folders':foldersWithInfo}
      return  responseBody, 200, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data sent'}
    return responseBody, 400, {'Content-Type':'application/json'}