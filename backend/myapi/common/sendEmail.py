from threading import Thread
from flask_mail import Mail, Message
from flask import current_app as app
#from manage import app
from datetime import datetime
from werkzeug import secure_filename
import smtplib
from ..common.createMessage import createMsg
from ..common.IMAPMailbox import makeNewIMAPconnection
from ..common.deleteDraft import deleteDraft


def send_async_email(app, msg):
	with app.app_context():
		mail.send(msg)


def send_email(email,username='', pwd='', **kwargs):
	server = smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT'])
	status = server.login(username, pwd)
	print(status)
	
	#эту линию нужно будет удалить после тестов
	email['from'] = {'name': 'Роман Решетняк', 'email': 'registration@stepanich.ru'}

	msg = createMsg(email)
	print(msg)
	server.send_message(msg)
	server.quit()
	print('Message sent')	

	#saving message in Sent folder	

	Mailbox = makeNewIMAPconnection()
	Mailbox.login(username, pwd)
	Mailbox.select_folder(app.config['IMAP_SENT_FOLDER'], readonly=False)
	print( Mailbox.append(app.config['IMAP_SENT_FOLDER'], msg.as_string(), [b'\\Seen']) )
	Mailbox.unselect_folder()
	deleteDraft(Mailbox,msg['Message-ID'],app.config['IMAP_DRAFT_FOLDER'])
	Mailbox.logout()
	
	

	#thr = Thread(target = send_async_email, args=[app, msg])
	#thr.start()
	return print('message sent')