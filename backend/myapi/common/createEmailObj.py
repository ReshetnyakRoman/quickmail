import email
from secrets import token_urlsafe
import quopri
from ..common.saveAttachment import saveAttachment
from ..common.extractToInfo import extractToInfo
from ..common.extractFromInfo import extractFromInfo
from dateutil import parser as dateParser
from datetime import datetime
import pytz
from html.parser import HTMLParser
from flask import current_app as app 

class MyHTMLParser(HTMLParser):
	text = ''
	def handle_data(self, data):
		self.text = self.text + data + ' '

def decodeEmailBody(content):
	success = True
	try:
		encoding = content['Content-Transfer-Encoding'].lower()
		#print('Message Content-Transfer-Encoding is: {}'.format(encoding))
		if encoding == 'base64':
			text = content.get_payload(decode=True).decode('utf8', 'replace')
		elif encoding == 'quoted-printable':
			text = quopri.decodestring(content.get_payload()).decode('utf-8')
		elif encoding == '7bit' or encoding == '8bit' or encoding == 'binary':
			text = content.get_payload(decode=True).decode('utf8', 'replace')
		else:
			try:
				text = content.get_payload().decode('utf8', 'replace')
			except:
				text = 'Cant decode email body content'
				success = False
	except:
		text = 'Cant get email body content'
		success = False
	return (success,text)

def createEmailObj(msg,uid,isUnreaded=True):
	#print('\n')
	#print('-------Message {} start-------'.format(uid))
	#print(msg)
	#print('-------Message end-------')
	
	#initalizing
	token = token_urlsafe(16)
	attachments = []
	html = 'Cant get email html content'
	text = 'Cant get email text content'
	htmlSuccess =  False
	textSuccess = False

	#parse email headers
	FromName, FromEmail = extractFromInfo(msg['From'])
	
	try:
		date = dateParser.parse(msg['Date'])
	except:
		datetime.now(pytz.timezone("Europe/Moscow"))

	try:
		subject = email.header.decode_header(msg['Subject'])[0][0].decode('utf8', 'replace')
	except:
		try:
			subject = email.header.decode_header(msg['Subject'])[0][0]
		except:
			subject = ''
	
	try:
		To = extractToInfo(msg['To'])
	except:
		To = []
	
	try:
		Cc = extractToInfo(msg['Cc'])
	except:
		Cc = []
	
	try:
		MessageID = msg['Message-ID']
	except:
		MessageID = random.randint(100000, 10000000)  + '@' + app.config['DOMAIN_NAME']


	#parse email body:
	if(msg.is_multipart()):	
		#print('Multipart message')
		for part in msg.walk():
			#print( "%s, %s, %s" % (part.get_content_type(), part.get_content_charset(), part.get_content_disposition()) )				
			contentType = part.get_content_type()

			if contentType == 'text/plain':
				(textSuccess, text) = decodeEmailBody(part)

			if contentType == 'text/html':
				(htmlSuccess, html) = decodeEmailBody(part)

			if part.get_content_disposition() == 'attachment':
				try:
					fileInfo = saveAttachment(part,uid,1234, token)
					#print('Attched file {} saved at {}, zize: {}B'.format(fileInfo[0], fileInfo[2], fileInfo[3]))
					attachments.append({'name': fileInfo[0],'path': fileInfo[1], 'url':fileInfo[2], 'size': fileInfo[3], })
				except:
					#print('Error: Cant get attachment')
					attachments.append({'name':'File corrupted', 'path':'','url':'','size':0})
	else:
		#print('Not multipart message')
		try:
			contentType = msg.get_content_type()
			#print('Message Content-type is: {}'.format(contentType))

			if contentType == 'text/plain':
				(textSuccess, text) = decodeEmailBody(msg)
			if contentType == 'text/html':
				(htmlSuccess, html) = decodeEmailBody(msg)
		
		except:
			#print('Error: Cant get email body')
			pass



	#defining body and snippet of emailObj
	if htmlSuccess:
		body = html
		#print('Convert html to text for snippet:')
		parser = MyHTMLParser()
		parser.feed(str(html))
		snippet = parser.text[0:100]
	else:
		body = text
		parser = MyHTMLParser()
		parser.feed(str(text))
		snippet = parser.text[0:100]

	emailObj = {
		'emailId': uid,
		'from': {'email': FromEmail, 'name': FromName} ,
		'cc': Cc,
		'to': To,
		'subject': subject,
		'receivingDate': date,
		'body': body,
		'snippet': snippet,
		'attachments':attachments,
		'avatar':'',
		'isUnreaded':isUnreaded,
		'MessageID': MessageID
	}

	#print('\n')
	#print('-----------------------emailObj-----------------------')
	#
	#for key in emailObj:
	#	print('{} : {}'.format(key,emailObj[key]))
	#
	#print('------------------------------------------------------')
	
	return emailObj

