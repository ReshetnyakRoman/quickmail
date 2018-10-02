from email.message import EmailMessage
from email.header import Header
from email.parser import BytesParser, Parser
from werkzeug import secure_filename
import random
from html.parser import HTMLParser
from datetime import datetime
import pytz
from flask import current_app as app 
#import magic
from mimetypes import MimeTypes
import base64
import re

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
	htmlBody = str(emailObj['body']) if 'body' in emailObj else ''
	parser.feed(htmlBody)
	textBody = parser.text
	msg['Subject'] = str(emailObj['Subject'] if 'Subject' in emailObj else emailObj['subject'] if 'subject' in emailObj else ' ')
	msg['From'] = createAddress(emailObj['From'])  if 'From' in emailObj else createAddress(emailObj['from'])  if 'from' in emailObj else ''
	
	if len(emailObj['to']):
		msg['To'] = [createAddress(person) for person in emailObj['to']]
	if len(emailObj['cc']):
		msg['Cc'] = [createAddress(person) for person in emailObj['cc']]	

	msg['Date'] = emailObj['Date'] if 'Date' in emailObj else datetime.now(pytz.timezone("Europe/Moscow"))
	msg['Message-ID'] = emailObj['MessageID'] if 'MessageID' in emailObj else str(random.randint(100000, 10000000)) + '@' + app.config['DOMAIN_NAME']


	msg.set_content(textBody, cte='base64')
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
	#print(msg.as_string())
	return msg

