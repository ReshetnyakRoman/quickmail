from flask_restful import Resource, reqparse, fields, marshal_with
from flask import request, current_app
from ..common.isSocialUserValid import isFBUserValid, isVKUserValid
from ..common.createResponseBody import createResponseBody
#from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.cleanUserDerictory import cleanUserDerictory
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.users import Users

folders_fields = {
  'folder':fields.String,
  'unreaded':fields.Integer, 
  'default':fields.Boolean,
  'UIDs': fields.List( fields.Integer, default=[] )
  }

resource_fields={
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  'email': fields.String(default=''),
  'accessToken':fields.String(default=''),
  'foldersWithInfo':fields.Nested( folders_fields ),
}

class auth(Resource):
  @marshal_with(resource_fields)
  def post(self):    
    if request.is_json:
      content = request.get_json(silent=True)

      isUserValid = isVKUserValid if content['loginType'] == 'VK' else isFBUserValid

      if isUserValid(content):
        print('\n{0}-user successfuly pass authentification'.format(content['loginType']) )
        responseBody = createResponseBody(content)
        return  responseBody, 200, {'Content-Type':'application/json'}
      
      else:
        print('Not valid {0}-user, token authentification faild'.format(content['loginType']) )
        responseBody = {'success':False, 'message':'Not valid {0}-user, token authentification faild'.format(content['loginType'])}
        return responseBody, 400, {'Content-Type':'application/json'}
  
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data sent'}
    return responseBody, 400, {'Content-Type':'application/json'}

resource_fields2 = {
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Something goes wrong'),
  }

class logout(Resource):
  @jwt_required
  @marshal_with(resource_fields2)
  def get(self):
    if request.headers.get('ID') == get_jwt_identity():
      userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
      MAIL_USERNAME = userInfo.osUserName
      MAIL_PASSWORD = userInfo.password
      
      print('\nUser with ID: {0} logout\n'.format(
        request.headers.get('ID')) )

      cleanUserDerictory(request.headers.get('ID'))
      
      responseBody = {'success':True, 'message':'Good bye!',}
      return  responseBody, 200, {'Content-Type':'application/json'}

    else:
      responseBody = {'success':False, 'message':'User not authorized'}
      return responseBody, 400, {'Content-Type':'application/json'}
    
    print('Filed request')
    
    responseBody = {'success':False, 'message':'Incorrect data was sent'}
    return responseBody, 400, {'Content-Type':'application/json'}