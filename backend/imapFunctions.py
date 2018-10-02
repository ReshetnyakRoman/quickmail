from imapclient import IMAPClient,imap_utf7
import ssl
import email
import datetime
import base64, quopri
import imaplib
import os
from secrets import token_urlsafe
import re
import imaplib 
from html.parser import HTMLParser
import email.header
from email.message import EmailMessage
from email.parser import BytesParser, Parser
from email.policy import default
from email.headerregistry import Address
from datetime import datetime
from os.path import basename
from mimetypes import MimeTypes
import pytz
import random
from dateutil import parser as dateParser
from werkzeug import secure_filename
from config import DevelopmentConfig as Config
from transliterate import translit
#IMAP_HOST = 'imap.gmail.com'
#MAIL_USERNAME = 'temp84g'
#MAIL_PASSWORD = 'Accorado2'
ATTACHMENT_SAVE_PATH = '/Users/macbookpro15/Downloads/'
SUB_DOMAIN_NAME = 'mail.stepanich.ru'
HTTP_PROTOCOL = 'http'
IMAP_TRASH_FOLDER = 'Deleted Messages'
IMAP_SENT_FOLDER ='Sent Messages'
IMAP_DRAFT_FOLDER = 'Drafts'
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE
#IMAP_HOST = 'imap.yandex.ru'
#MAIL_USERNAME = 'reshetnyak.rb'
#MAIL_PASSWORD = 'Accorado1'
IMAP_HOST = '104.238.111.93'
DOMAIN_NAME = 'stepanich.ru'
MAIL_USERNAME = 'registration'
MAIL_PASSWORD = 'Registration_2001'

#IMAP_HOST = app.config['IMAP_HOST']
#DOMAIN_NAME = app.config['DOMAIN_NAME']

def createEmailObj(msg,uid,isUnreaded=True):
	text = ""
	html = None
	token = token_urlsafe(16)
	attachments = []
	
	date = dateParser.parse(msg['Date']) if 'Date' in msg else datetime.now(pytz.timezone("Europe/Moscow"))

	try:
		subject = email.header.decode_header(msg['Subject'])[0][0].decode('utf8', 'replace')
	except:
		subject = email.header.decode_header(msg['Subject'])[0][0]

	FromName, FromEmail = extractFromInfo(msg['From'])
	try:
		To = extractToInfo(msg['To'])
	except:
		To = []
	try:
		Cc = extractToInfo(msg['Cc'])
	except:
		Cc = []
	if(msg.is_multipart()):	
		for part in msg.get_payload():
			#print( "%s, %s, %s" % (part.get_content_type(), part.get_content_charset(), part.get_content_disposition()) )
			#try:
				if part.get_content_type() == 'text/plain':
					text = part.get_payload(decode=True).decode('utf8', 'replace')
				if part.get_content_type() == 'text/html':
					html = part.get_payload(decode=True).decode('utf8', 'replace')
				if part.get_content_disposition() == 'attachment':
					
					print('++++++++++++Attachments+++++++++++++++++++')
					fileInfo = saveAttachment(part,uid,1234, token)
					print('File {} saved at {}, zize: {}B'.format(fileInfo[0], fileInfo[2], fileInfo[3]))
					attachments.append({'name': fileInfo[0],'path': fileInfo[1], 'url':fileInfo[2], 'size': fileInfo[3], })
			#except:
			#	text = 'Error during reciving email body'
	else:
		try:
			html = quopri.decodestring(msg.get_payload()).decode("utf-8")
		except:
			pass
		
	if html is not None:
		body = html
	else:
		body = text
	emailObj = {
		'emailId': uid,
		'from': [ {'email': FromEmail, 'name': FromName} ],
		'cc': Cc,
		'to': To,
		'subject': subject,
		'receivingDate': date,
		'body': body,
		'attachments':attachments,
		'avatar':'',
		'isUnreaded':isUnreaded,
	}

	print('-----------------------message-----------------------')
	print('date: {}'.format(date))
	print('Subject: {}'.format(subject))
	print('Mail from: {}, {}'.format(FromName, FromEmail))
	print('Mail To: {}'.format(To))
	print('Copy to: {}'.format(Cc))
	print('Attachments : {}'.format(attachments))
	print('Body:')
	print(body)
	print('-----------------------------------------------------')
	return emailObj


def getLastUID(Mailbox, folder):
	Mailbox.select_folder(folder, readonly=True)
	mails = Mailbox.search()
	Mailbox.unselect_folder()
	LastUID = mails[-1] if mails else 0
	return LastUID

class MyHTMLParser(HTMLParser):
	text = ''
	def handle_data(self, data):
		self.text = self.text + data + ' ' 

def decodeInfo(msgFrom):
	rawMsg = email.header.decode_header(msgFrom)
	Msg = ''
	for part in rawMsg:
		try:
			partOfMsg = part[0].decode('utf8', 'replace')
		except:
			partOfMsg = str(part[0])
		Msg += partOfMsg
	return Msg

def parseEmailAdress(adressString):
	return email.utils.parseaddr(adressString)



def extractFromInfo(msgFrom):
	From  = decodeInfo(msgFrom)
	return parseEmailAdress(From)

def extractToInfo(msgTo):
	ToList = list( map( lambda adr: parseEmailAdress(adr.strip()), decodeInfo(msgTo).split(',') ) )
	To = [{'email': adress[1], 'name':adress[0]} for adress in ToList]
	return To

def get_subFolders(dir):
    return [name for name in os.listdir(dir)
            if os.path.isdir(os.path.join(dir, name))]

def saveAttachment(part, uid,userID, token=''):
	
	filename = secure_filename( translit(decodeInfo(part.get_filename()),'ru', reversed=True) )
	identityPart = str(userID)+'/'+str(uid)+'/'
	securePart = identityPart + token
	
	if not os.path.exists(Config.ATTACHMENT_SAVE_PATH + identityPart):
		os.makedirs(Config.ATTACHMENT_SAVE_PATH+securePart)
	else:
		subfolder = get_subFolders(Config.ATTACHMENT_SAVE_PATH + identityPart)
		if len(subfolder):
			securePart = identityPart + subfolder[0]
		else:
			os.makedirs(Config.ATTACHMENT_SAVE_PATH+securePart)

			
	basePath = Config.ATTACHMENT_SAVE_PATH+securePart		
	fullAttachmentPath = os.path.join(basePath, filename)
	url = os.path.join(Config.HTTP_PROTOCOL+'://'+Config.SUB_DOMAIN_NAME+'/attachments/'+securePart, filename)

	if not os.path.isfile(fullAttachmentPath):
		fp = open(fullAttachmentPath, 'wb')
		fp.write(part.get_payload(decode=True))
		fp.close()
	
	size = os.path.getsize(fullAttachmentPath)
		
	return [filename, fullAttachmentPath, url, size]

def getEmail(Mailbox, folder, uid):
	#try:
	Mailbox.select_folder(folder, readonly=False)
	rawResponse = Mailbox.fetch(uid,['RFC822'])
	print(rawResponse)
	rawResponse1 = Mailbox.fetch(uid,['BODY[]'])
	print(rawResponse1)
	rawResponse2 = Mailbox.fetch(uid,['BODY.PEEK[]'])
	print(rawResponse1)
	msg = email.message_from_bytes(rawResponse[uid][b'RFC822'])
	#print(msg)
	text = ""
	html = None
	token = token_urlsafe(16)
	attachments = []
	
	date = msg['Date'] if 'Date' in msg else datetime.now(pytz.timezone("Europe/Moscow"))

	try:
		subject = email.header.decode_header(msg['Subject'])[0][0].decode('utf8', 'replace')
	except:
		subject = email.header.decode_header(msg['Subject'])[0][0]

	FromName, FromEmail = extractFromInfo(msg['From'])
	try:
		To = extractToInfo(msg['To'])
	except:
		To = []
	try:
		Cc = extractToInfo(msg['Cc'])
	except:
		Cc = []
	if(msg.is_multipart()):	
		for part in msg.get_payload():
			#print( "%s, %s, %s" % (part.get_content_type(), part.get_content_charset(), part.get_content_disposition()) )
			try:
				if part.get_content_type() == 'text/plain':
					text = part.get_payload(decode=True).decode('utf8', 'replace')
				if part.get_content_type() == 'text/html':
					html = part.get_payload(decode=True).decode('utf8', 'replace')
				if part.get_content_disposition() == 'attachment':
					
					print('++++++++++++Attachments+++++++++++++++++++')
					fileInfo = saveAttachment(part,uid,1234, token)
					print('File {} saved at {}, zize: {}B'.format(fileInfo[0], fileInfo[2], fileInfo[3]))
					attachments.append({'name': fileInfo[0],'path': fileInfo[1], 'url':fileInfo[2], 'size': fileInfo[3], })
			except:
				text = 'Error during reciving email body'
	else:
		try:
			html = quopri.decodestring(msg.get_payload()).decode("utf-8")
		except:
			pass
		
	if html is not None:
		body = html
	else:
		body = text
	emailObj = {
		'emailId': uid,
		'from': [ {'email': FromEmail, 'name': FromName} ],
		'cc': Cc,
		'to': To,
		'subject': subject,
		'receivingDate': date,
		'body': body,
		'attachments':attachments,
		'avatar':'',
	}

	print('-----------------------message-----------------------')
	print('date: {}'.format(date))
	print('Subject: {}'.format(subject))
	print('Mail from: {}, {}'.format(FromName, FromEmail))
	print('Mail To: {}'.format(To))
	print('Copy to: {}'.format(Cc))
	print('Attachments : {}'.format(attachments))
	print('Body:')
	print(body)
	print('-----------------------------------------------------')


	Mailbox.unselect_folder()
	return (True, emailObj)
	#except:
	#	emailObj = {
	#		'emailId': uid,
	#		'from': [ {'email': 'error', 'name': ''} ],
	#		'cc': '',
	#		'to': '',
	#		'subject': 'Error during reciving email',
	#		'receivingDate': '',
	#		'body': '',
	#		'attachments':[],
	#		'avatar':'',
	#	}
	#	print('Error during reciving email uid: {}'.format(uid))
	#	Mailbox.unselect_folder()
	#	return (False, emailObj)



#mean move to Trash folder
def deleteEmail(Mailbox, folder, uid): 
	moveToFolder(Mailbox, folder, IMAP_TRASH_FOLDER, uid)
	return 'Email %s moved to %s' % (uid, 'Trash')


def moveToFolder(Mailbox, fromFolder, toFolder, uid):
	Mailbox.select_folder(fromFolder, readonly=False)
	Mailbox.move(messages=[uid],folder=toFolder)
	Mailbox.unselect_folder()
	print('Email %s moved to %s' % (uid, toFolder))
	return 'Email %s moved to %s' % (uid, toFolder)

#mean permanently delete emails from Delete folders and set flag br'\Deleted'
def emptyFolder(Mailbox, uid=None, folder=IMAP_TRASH_FOLDER):
	try:
		Mailbox.select_folder(folder, readonly=False)
		mailsToDelete = Mailbox.search() if uid is None else [uid]
		Mailbox.add_flags(mailsToDelete, br'\Deleted')
		Mailbox.expunge()
		Mailbox.unselect_folder()
		print('Emails {} deleted'.format(mailsToDelete))
		return True
	except:
		print('Error occure during emails during removal')
		return True

def getEmailList(Mailbox, lastShownUID, stepsBack,folder='INBOX'):
	response = Mailbox.select_folder(folder, readonly=False)
	lastUID = response[b'UIDNEXT'] - 1
	#numberOfMails = response[b'EXISTS'] 
	
	emailList = []

	#=====fast version======
	allMessages = Mailbox.search(['NOT', 'DELETED'])

	end = len(allMessages)+1 if lastShownUID > lastUID else allMessages.index(lastShownUID)
	start = end - stepsBack if end - stepsBack > 0 else 0
	
	selectedMessages = allMessages[start:end]
	
	print('Getting emeils from {} to {}'.format(start, end))
	print(selectedMessages)
	
	lastShownUID = selectedMessages[0]

	rawResponse = Mailbox.fetch(selectedMessages,['BODY.PEEK[HEADER]','FLAGS','BODYSTRUCTURE','BODY.PEEK[1]'])
	print(rawResponse)

	for messageID in rawResponse:
		try:
		  msgHeader = email.message_from_bytes(rawResponse[messageID][b'BODY[HEADER]'])
		  isAttachment = True if re.findall( 'multipart/mixed', msgHeader['Content-Type']) else False
		  isUnreaded = False if b'\\Seen' in rawResponse[messageID][b'FLAGS'] else True
		  subject = decodeInfo(msgHeader['Subject'])
		  date = dateParser.parse(msgHeader['Date'])
		  FromName, FromEmail = extractFromInfo(msgHeader['From'])
		  body = ''
		  #print(rawResponse[messageID][b'BODY[1]'])
		  

		  try:
		  	body =	base64.b64decode(rawResponse[messageID][b'BODY[1]']).decode("utf-8")
		  except:
		  	try:
		  		rawBody = email.message_from_bytes(rawResponse[messageID][b'BODY[1]']).get_payload(decode=True).decode('utf8', 'replace')
		  		body = base64.b64decode(rawBody.split('\n')[4]).decode("utf-8")
		  	except:
		  		body = quopri.decodestring(rawResponse[messageID][b'BODY[1]']).decode("utf-8")
		  		
		  parser = MyHTMLParser()
		  parser.feed(body)
		  body = parser.text
		  print('\n')
		  print('---------- {} ----------'.format(messageID))
		  print('Email from: {} <{}>, received on: {}'.format(FromName,FromEmail, date))
		  print('subject: {}'.format(subject))
		  print(body)
		  print('isAttachment: {}'.format(isAttachment))
		  print('isUnseen: {}'.format(isUnreaded))
		  print('--------------------------')

		  emailList.append({
				'emailId': messageID, 
				'from': {'email': FromEmail, 'name': FromName },
				'isUnreaded': isUnreaded, 
				'subject': subject, 
				'snippet': body[0:100], 
				'receivingDate': date, 
				'attachments': isAttachment,
				'avatar':'' })
		except:
			print('Error in getting message with uid: {}'.format(messageID))

	  #=====slow version=====

		#uid = startUID
		#received = 0
		#while received <= stepsBack and uid > 0:
		#	rawResponse = Mailbox.fetch(uid,['BODY.PEEK[HEADER]','BODY.PEEK[1]<0.50>'])
		#	uid -= 1
		#	if bool(rawResponse):
		#		received += 1
		#		print(rawResponse)
		#	else:
		#		print(rawResponse)	
		#	print('received: {}, uid: {}'.format(received, uid))
	Mailbox.unselect_folder()
	return (emailList,lastShownUID)







def markUnseen(Mailbox, folder, uid):
	Mailbox.select_folder(folder, readonly=False)
	res = Mailbox.remove_flags(uid,'\\Seen')
	print('Message {} mark us unreaded'.format(uid))
	Mailbox.unselect_folder()
	return None 

def createFolder(Mailbox, folderName):
	try:
		Mailbox.create_folder(folderName)
		print('Folder %s created' % (folderName))
		return True
	except:
		print('Coudnt crate folder')
		return False
	
def deleteFolder(Mailbox, folderName):
	try:
		Mailbox.delete_folder(folderName)
	except:
		print('No such folder')
	print('Folder %s deleted' % (folderName))
	return 'Folder %s deleted' % (folderName)

def selectFolder(Mailbox, folder):
	response = Mailbox.select_folder(folder, readonly=False)
	Mailbox.unselect_folder()
	lastUID = response[b'UIDNEXT'] - 1
	numberOfMails = response[b'EXISTS']
	return [lastUID,numberOfMails]

def numberOfUndreaded(Mailbox, folder):
	Mailbox.select_folder(folder, readonly=True)
	messages =  Mailbox.search(['NOT','SEEN'])
	Mailbox.unselect_folder()
	return len(messages)

class MyHTMLParser(HTMLParser):
	text = ''
	def handle_data(self, data):
		self.text = self.text + data + ' ' 

def createAddress(person):
	adress = '"{}" <{}>'.format(person['name'],person['email']) if 'name' in person and 'name' != '' else person['email']
	return adress

def createMsg(emailObj={}):
	msg = EmailMessage()
	parser = MyHTMLParser()
	htmlBody = emailObj['body'] if 'body' in emailObj else ''
	parser.feed(htmlBody)
	textBody = parser.text
	DOMAIN_NAME = 'hello' #app.config['DOMAIN_NAME']
	msg['Subject'] = emailObj['Subject'] if 'Subject' in emailObj else emailObj['subject'] if 'subject' in emailObj else ' '
	msg['From'] = createAddress(emailObj['From'])  if 'From' in emailObj else createAddress(emailObj['from'])  if 'from' in emailObj else ''
	msg['To'] = [createAddress(person) for person in emailObj['To']] if 'To' in emailObj else [createAddress(person) for person in emailObj['to']] if 'to' in emailObj else ''
	msg['Cc'] = [createAddress(person) for person in emailObj['Cc']] if 'Cc' in emailObj else [createAddress(person) for person in emailObj['cc']] if 'cc' in emailObj else ''
	msg['Date'] = emailObj['Date'] if 'Date' in emailObj else datetime.now(pytz.timezone("Europe/Moscow"))
	msg['Message-Id'] = str( emailObj['id'] if 'id' in emailObj else random.randint(10000, 100000) ) +'@'+DOMAIN_NAME
	msg.set_content(textBody,cte='base64')
	msg.add_alternative(htmlBody, subtype='html', cte='base64')

	#adding existing files attached by client
	if 'attachedFiles' in emailObj and len(emailObj['attachedFiles']):
		for file in emailObj['attachedFiles']:
			try:
				[mainType, subType] = file.content_type.split('/')
				msg.add_attachment(file.read(), mainType, subType, filename=('utf8', '', secure_filename(file.filename)))
			except:
				pass
	
	#attaching referenced files, from original reply message
	if 'attachments' in emailObj and len(emailObj['attachments']):
		for fileInfo in emailObj['attachments']:
			mime = MimeTypes()
			[mainType, subType] = mime.guess_type(fileInfo['path'])[0].split('/')

			file = open(fileInfo['path'],'rb')

			msg.add_attachment(file.read(), mainType, subType, filename=('utf8', '', file.name))
			file.close()
	print(msg.as_string())
	return msg

def saveDraft(Mailbox, emailObj={}):
	Mailbox.select_folder(IMAP_DRAFT_FOLDER, readonly=False)
	draftID = str(emailObj['id']) + '@' + DOMAIN_NAME if 'id' in emailObj else ''
	drafts = Mailbox.search(['TEXT',draftID])
	
	if drafts:
		for draft in drafts:
			print('Deleting previous version for draft uid: {}\n'.format(draft))
			Mailbox.set_flags(draft,b'\Deleted')
			Mailbox.expunge(draft)

	msg =  createMsg(emailObj)
	print(Mailbox.append(IMAP_DRAFT_FOLDER, msg))
	return print('Message saved')

def saveSent(Mailbox, emailObj={}):
	Mailbox.select_folder(IMAP_SENT_FOLDER, readonly=False)
	msg =  createMsg(emailObj).as_string()
	print(Mailbox.append(IMAP_SENT_FOLDER, msg))
	return print('Message saved')


#=============Data for test to be deleted=====
mime = MimeTypes()
file = None
AttachFilepath = '/Users/macbookpro15/Documents/ReactJS/QuickMail/myapi/рома.png'
with open(AttachFilepath, 'rb') as fp:
	fileData = fp.read()
	fileMIME = mime.guess_type(AttachFilepath)[0]
	mainType = fileMIME.split('/')[0]
	subType = fileMIME.split('/')[1]
	fileSize=fp.tell()
	fileName=basename(AttachFilepath)

fileObj = {'name': fileName, 'file':fileData , 'size':fileSize, 'MIME':fileMIME}

emailObj = {
	'id': 1234567,
	'Date': datetime.now(),
	'From':{'name':'roman.reshetnyak', 'email':'registration@stepanich.ru'},
	'To': [{'name':'vian.vinos', 'email':'temp84g@gmail.com'}],
	'Cc': [{'name':'dima.vinos', 'email':'reshetnyak.rb@yandex.ru'}],
	'Subject':'На дворе вечерело',
	'body':'<div><b>Hello Привет мир</b>версия 2.6</div>',
	'attachments':[]
}
#==============================================

def getSubFolders(Mailbox):
	folders = Mailbox.list_folders()
	defaultFolders = [IMAP_SENT_FOLDER,IMAP_DRAFT_FOLDER,IMAP_TRASH_FOLDER,'INBOX']
	subFolders = [folder[2] for folder in folders if folder[2] not in defaultFolders]
	return subFolders

def lastUID(Mailbox, folder):
	Mailbox.select_folder(folder, readonly=True)
	mails = Mailbox.search()
	Mailbox.unselect_folder()
	LastUID = mails[-1] if mails else 0
	print(LastUID)
	return LastUID

def getEmailList2(Mailbox, lastShownUID, stepsBack,folder='INBOX'):
	lastUID = getLastUID(Mailbox,folder)
	response = Mailbox.select_folder(folder, readonly=False)
	print(response)
	#numberOfMails = response[b'EXISTS'] 
	
	emailList = []

	allMessages = Mailbox.search(['NOT', 'DELETED'])
	print('All messages: {} in {} '.format(allMessages,folder))

	if len(allMessages) == 0:
		return (emailList,0)
	if lastShownUID == 0:
		return (emailList,0)

	#Calculating boundries for emaillist request:	
	if stepsBack != 0:
		#count back from lastShownUID
		if lastShownUID > lastUID:
			end = len(allMessages)+1
			start = end - stepsBack - 1 if end - stepsBack > 0 else 0
		else:
			try:
				index = allMessages.index(lastShownUID)
			except:
				print('Last shown UID {} not in the folder {}'.format(lastShownUID,folder))
				#finding nearest UID to given lastShownUID
				allMessagesTemp = sorted( allMessages[:].append(lastShownUID) )
				indexTemp = allMessagesTemp.index(lastShownUID)		
				
				if indexTemp == 0:
					return (emailList,0)
				else:
					#index = indexTemp - 1
					index = indexTemp - 1
			
			end =  index
			start = end - stepsBack if end - stepsBack > 0 else 0
	else:
		#return all latest emails up to lastShownUID
		try:
			index = allMessages.index(lastShownUID) + 1
		except:
			print('Last shown UID {} not in the folder {}'.format(lastShownUID,folder))
			#finding nearest UID to given lastShownUID
			allMessagesTemp = sorted( allMessages[:].append(lastShownUID) )
			indexTemp = allMessagesTemp.index(lastShownUID)		
			index = indexTemp
		
		start = index
		end = None
		print('sb: {},start: {}, end: {}, allMessages.len {}'.format(stepsBack,start,end,len(allMessages) ))

	selectedMessages = allMessages[start:end]
	
	if len(selectedMessages) == 0:
		return (emailList,0)
	
	print('Getting e-mails:')
	print(selectedMessages)
	
	lastShownUID = selectedMessages[0]

	rawResponse = Mailbox.fetch(selectedMessages,['FLAGS','BODY.PEEK[]'])
	for messageID in rawResponse:
		try:
			isUnreaded = False if b'\\Seen' in rawResponse[messageID][b'FLAGS'] else True
			msg = email.message_from_bytes(rawResponse[messageID][b'BODY[]'])
			emailObj = createEmailObj(msg,messageID,isUnreaded)
			emailList.append(emailObj)
		except:
			pass

	print(emailList)

	Mailbox.unselect_folder()
	return (emailList[::-1],lastShownUID)

def searchForEmail(Mailbox, string, folders=['INBOX']):
	matchingMails = []
	
	for folder in folders:
		Mailbox.select_folder(folder, readonly=False)
		
		try:
			mails = Mailbox.search(['TEXT', '"{}"'.format(string).encode('UTF-8') ], 'UTF-8')
		except IMAPClient.Error as exc:
			print(exc)
			pass
		matchingMails.append({'folder':folder, 'mails':mails})
		Mailbox.unselect_folder()
		print(matchingMails)
	return matchingMails

def searchEmails(string, folders=['"Sent Messages"']):
	totalUIDlist = []
	#try:
	M = imaplib.IMAP4_SSL(IMAP_HOST, 993)
	M.login(MAIL_USERNAME, MAIL_PASSWORD)
	
	for folder in folders:
		searchObj = {}
		M.select(folder)
		rawResponse = M.uid('search','CHARSET', 'UTF-8', 'TEXT' ,'"{}"'.format(string).encode('UTF-8') )
		uidString = rawResponse[1][0].decode("utf-8")
		if len(uidString):
			searchObj[folder] = list( map(lambda x:int(x), uidString.split(' ')) ) 
		else:
			searchObj[folder] = []
		totalUIDlist.append(searchObj)

	print(totalUIDlist)
	#except:
	#	pass
	return totalUIDlist


emailObj = {
		'emailId': 1234,
		'From': {'email': 'temp84g@gmail.com', 'name': 'Роман'} ,
		'Cc': [],
		'To': [],
		'Subject': 'Русская тема',
		'receivingDate': datetime.now(pytz.timezone("Europe/Moscow")),
		'body': '<p>русское тело....</p>',
		'attachments':[],
		'avatar':'',
	}

#Mailbox = IMAPClient(IMAP_HOST,ssl_context=ssl_context, use_uid=True,timeout=5)
#res = Mailbox.login(MAIL_USERNAME, MAIL_PASSWORD)
#createFolder(Mailbox, 'Роман')
#getSubFolders(Mailbox)
#emptyFolder(Mailbox,IMAP_DRAFT_FOLDER)
#res = lastUID(Mailbox, 'Sent Messages')
#getEmail(Mailbox,'Sent Messages',42)
#saveSent(Mailbox, emailObj)
#Mailbox.select_folder('INBOX')
#print(Mailbox.search(['TEXT','']))
#Mailbox.unselect_folder()
#Mailbox.select_folder('Sent Messages')
#res = Mailbox.search()
#getEmailList(Mailbox, 33, 10,'Sent Messages')
#print(res)
#print(Mailbox.welcome)
#print(Mailbox.id_())
#print(Mailbox.capabilities())
#print(Mailbox.list_folders())
#print(numberOfUndreaded(Mailbox,'INBOX'))
#Mailbox.enable('UTF8')

#deleteEmail(Mailbox, 'INBOX', 6)
#getEmailList2(Mailbox,8000,5,'Sent Messages')
#getEmail(Mailbox,IMAP_SENT_FOLDER,33)
#searchForEmail(Mailbox,'temp84g@gmail.com')
searchEmails('Еще одн')
#Mailbox.logout()
#M = imaplib.IMAP4_SSL(IMAP_HOST, 993)
#M.login(MAIL_USERNAME, MAIL_PASSWORD)
#print(M.select('INBOX'))
#print(M.select('Hello'))

