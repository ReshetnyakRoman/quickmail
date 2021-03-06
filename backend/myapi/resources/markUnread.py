from flask_restful import Resource, fields, marshal_with, reqparse
from flask import request
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.markUnseen import markUnseen
from ..models.users import Users
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import defaultFolders

resource_fields = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  }



class markUnread(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def patch(self, folder, uid):
        
    parser = reqparse.RequestParser()
    parser.add_argument('markUnread', help='flasg to change message status')
    args = parser.parse_args()
    markUnread = False if args['markUnread'] == 'false' else True
    status = ['Readed','Unreaded']

    IMAPfolderName = defaultFolders[folder] if folder in defaultFolders else folder
    
    if request.headers.get('ID') == get_jwt_identity():
      userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
      MAIL_USERNAME = userInfo.osUserName
      MAIL_PASSWORD = userInfo.password

      Mailbox =  makeNewIMAPconnection()
      Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
      result = markUnseen(Mailbox, IMAPfolderName, uid, markUnread)
      Mailbox.logout()

      if result:
        responseBody = {'success':True, 'message':'OK'}
        return  responseBody, 200, {'Content-Type':'application/json'}
      else:
        responseBody = {'success':False, 'message':'Problem during mark email unreaded from server'}
        return responseBody, 400, {'Content-Type':'application/json'}
    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}