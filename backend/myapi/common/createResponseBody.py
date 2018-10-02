from ..models.users import Users
from flask_jwt_extended import create_access_token
from flask import current_app as app
from ..common.createOsUser import createOsUser
from ..common.selectFolder import selectFolder
from ..common.numberOfUndreaded import numberOfUndreaded
from ..common.getFolders import getFolders
#from ..common.getLastUID import getLastUID
from ..common.getUIDs import getUIDs
from config import defaultFoldersReversed

def createResponseBody(content, Mailbox):
  if( Users.isRegistred(content['ID']) ):
    print('Getting data of registred user...')
    user = Users.query.filter_by(userID=content['ID']).first()
    print(user)
    email = user.email
    accessToken = user.accesToken
  else:
    print('Creating new user...')
    secret = app.config['JWT_SECRET_KEY']
    #accessToken = createTocken(content['ID'],secret)
    accessToken = create_access_token(identity=content['ID'])
    osUser = createOsUser(content['name'])
    email = osUser['name'] + '@{}'.format(app.config['DOMAIN_NAME'])
    
    newUser = {
      'userID':content['ID'],
      'name': content['name'],
      'url': content['pic'],
      'loginType': content['loginType'],
      'email': email,
      'osUserName': osUser['name'],
      'password': osUser['psw'],
      'accesToken': accessToken,
      'secretKey':secret
    }

    Users.register(newUser)
  
  folders = getFolders(Mailbox)
  foldersWithInfo = [ {
    'folder': defaultFoldersReversed[folder] if folder in defaultFoldersReversed else folder, 
    'default': True if folder in defaultFoldersReversed else False,
    #'lastUID': getLastUID(Mailbox, folder), 
    'UIDs': getUIDs(Mailbox, folder),
    'unreaded':numberOfUndreaded(Mailbox, folder)} for folder in folders ]

  print(foldersWithInfo)


  return {
    'success':True,
    'message':'User registred',
    'email':email,
    'accessToken':accessToken,
    'foldersWithInfo':foldersWithInfo,
    }