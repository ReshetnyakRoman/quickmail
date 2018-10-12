from ..models.users import Users
from flask_jwt_extended import create_access_token
from flask import current_app as app
from ..common.createOsUser import createOsUser
from ..common.selectFolder import selectFolder
from ..common.numberOfUndreaded import numberOfUndreaded
from ..common.getFolders import getFolders
from ..common.getUIDs import getUIDs
from config import defaultFoldersReversed
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.welcomeMessage import welcome_message
from ..common.createFolder import createFolder

def createResponseBody(content):
  status = True
  message = 'User registred'
  if( Users.isRegistred(content['ID']) ):
    print('Getting data of registred user...\n')
    user = Users.query.filter_by(userID=content['ID']).first()
    email = user.email
    accessToken = user.accesToken
    MAIL_USERNAME = user.osUserName
    MAIL_PASSWORD = user.password
  
  else:
    print('Creating new user...\n')
    secret = app.config['JWT_SECRET_KEY']
    accessToken = create_access_token(identity=content['ID'])
    osUser = createOsUser(content['name'])

    if (osUser[0] == True):
      email = osUser[1]['name'] + '@{}'.format(app.config['DOMAIN_NAME'])
      welcome_message(email)
      newUser = {
        'userID':content['ID'],
        'name': content['name'],
        'url': content['pic'],
        'loginType': content['loginType'],
        'email': email,
        'osUserName': osUser[1]['name'],
        'password': osUser[1]['psw'],
        'accesToken': accessToken,
        'secretKey':secret
      }

      Users.register(newUser)
      MAIL_USERNAME = osUser[1]['name']
      MAIL_PASSWORD = osUser[1]['psw']
    else:
      status = False
      message = 'Cant create new user'

  if status:
    Mailbox =  makeNewIMAPconnection()
    Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)    
    defaultFolders = [app.config['IMAP_SENT_FOLDER'], app.config['IMAP_DRAFT_FOLDER'], app.config['IMAP_TRASH_FOLDER'], app.config['IMAP_INBOX_FOLDER']]
    currentFolders = getFolders(Mailbox)
    
    for folder in defaultFolders:
      if folder not in currentFolders:
        createFolder(Mailbox,folder)

    folders = getFolders(Mailbox)
    foldersWithInfo = [ {
      'folder': defaultFoldersReversed[folder] if folder in defaultFoldersReversed else folder, 
      'default': True if folder in defaultFoldersReversed else False,
      'UIDs': getUIDs(Mailbox, folder),
      'unreaded':numberOfUndreaded(Mailbox, folder)} for folder in folders ]
    Mailbox.logout()
  
  else: 
    foldersWithInfo = []
    accesToken = ''
    email = ''

  return {
    'success':status,
    'message':message,
    'email':email,
    'accessToken':accessToken,
    'foldersWithInfo':foldersWithInfo,
    }

    
