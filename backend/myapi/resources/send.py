from flask_restful import Resource, reqparse, fields, marshal_with
from flask import jsonify, json, request
from ..common.sendEmail import send_email
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.users import Users


resource_fields={
  'success': fields.Boolean(default=False),
  'message': fields.String(default='Some problems at server side'),
}

class send(Resource):
  @jwt_required
  @marshal_with(resource_fields)
  def post(self):
    print('\nStart sending email...')
    try:
      email = json.loads(request.form['textData'])
      #print(email)
      if request.files.getlist('docs'):
        email['attachedFiles'] = request.files.getlist('docs')
        print(request.files.getlist('docs'))
      
      if request.headers.get('ID') == get_jwt_identity():
        userInfo = Users.query.filter_by(userID=request.headers.get('ID')).first()
        MAIL_USERNAME = userInfo.osUserName
        MAIL_PASSWORD = userInfo.password

        send_email(email, MAIL_USERNAME, MAIL_PASSWORD) 

        return {'success':True, 'message':'Message sent'}, 200, {'Content-Type':'application/json'}
      else:
        return {'success':False, 'message':'User not authorized'}, 400, {'Content-Type':'application/json'}
    except:
      return {'success':False, 'message':'Some problems at server side'}, 400, {'Content-Type':'application/json'}


