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


def send_email(email,username='', pwd='', **kwargs):
	server = smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT'])
	status = server.login(username, pwd)
	
	msg = createMsg(email)
	#print(msg)
	server.send_message(msg)
	server.quit()
	print('Message sent')	

	#saving message in Sent folder	and clean drafts

	Mailbox = makeNewIMAPconnection()
	Mailbox.login(username, pwd)
	Mailbox.select_folder(app.config['IMAP_SENT_FOLDER'], readonly=False)
	appendResult = Mailbox.append(app.config['IMAP_SENT_FOLDER'], msg.as_string(), [b'\\Seen'])
	print('Adding msg to "Sent Messages" : {}'.format(appendResult))
	Mailbox.unselect_folder()
	deleteDraft(Mailbox,msg['Message-ID'],app.config['IMAP_DRAFT_FOLDER'])
	
	Mailbox.logout()

	return True