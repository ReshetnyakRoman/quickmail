import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
	SECRET_KEY = os.environ.get('SECRET_KEY') or 'QuickMailForYou'
	SQLALCHEMY_COMMIT_ON_TEARDOWN = True
	SQLALCHEMY_TRACK_MODIFICATIONS = True
	DOMAIN_NAME = 'stepanich.ru'
	SUB_DOMAIN_NAME = 'mail.stepanich.ru'
	JWT_ACCESS_TOKEN_EXPIRES = False
	JWT_TOKEN_LOCATION = 'headers'
	JWT_SECRET_KEY = 'OtE-Yhg37YGiOj49QMVFKwvI3GtJ-H5J5Qe1mbKhSO862Uo562Z8ovz9TV9JeOs-ePXr7dnnMDpTRTKdst7ExHORhKskYvFAboH2vRNdXnq5F-f_JDY2aJRpbS57WN05VURtJI0Af7cIo1btk7wjei1JQrrscnn-xAI9Ua_2opU'
	BUNDLE_ERRORS = True
	ADMIN_PASSWORD = 'ADMIN_PASSWORD'
	SMTP_NAME = = 'registration' # os.environ.get('MAIL_USERNAME')
	SMTP_PASSWORD = 'Registration_2001' # os.environ.get('MAIL_PASSWORD')) 
	MAIL_SERVER = '104.238.111.93'
	MAIL_PORT = 25	
	IMAP_HOST = '104.238.111.93'
	IMAP_TRASH_FOLDER = 'Deleted Messages'
	IMAP_SENT_FOLDER = 'Sent Messages'
	IMAP_DRAFT_FOLDER = 'Drafts'
	IMAP_INBOX_FOLDER = 'INBOX'
	HTTP_PROTOCOL = 'http'
	FB_APP_ID = 1944357025611194
	FB_SECRET = '28809a4e170a7fb9f5a6f3f7e21fdd65'
	FB_CLIENT_TOKEN = '79bbb883522894421627b3280dc1fa2e'
	VK_APP_ID = 6715244 #6669338
	VK_SECRET = 'RFzMjDyjAoUAdfFCaCF8' #'1TywXSFFaLKr2XtY7whl'
	VK_SERVICE_TOKEN = '1189c5501189c5501189c5501a11efb23c111891189c5504a32ba5b5737c7f4ee2db786' #'e7a80428e7a80428e7a80428c7e7cdc032ee7a8e7a80428bcd537c09fc9fa9756962c30'


	@staticmethod
	def init_app(quickmail): 
		pass


class DevelopmentConfig(Config): 
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = 'mysql://quickmail:quickmail@localhost/quickmail?charset=utf8'
	SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'sql_repository')
	ATTACHMENT_SAVE_PATH = '/Users/macbookpro15/Downloads/'
	#STEPANICH
	

	

class UnixConfig(DevelopmentConfig):
	@classmethod
	def init_app(cls, app):
		ATTACHMENT_SAVE_PATH = ''
		ProductionConfig.init_app(app)
		# log to syslog
		import logging
		from logging.handlers import SysLogHandler
		syslog_handler = SysLogHandler()
		syslog_handler.setLevel(logging.WARNING)
		app.logger.addHandler(syslog_handler)
		#логи пишуться в /var/log/messages

config = {
    'development': DevelopmentConfig,
    'default': UnixConfig
} 

defaultFolders = {
	'Inbox': Config.IMAP_INBOX_FOLDER,
	'inbox': Config.IMAP_INBOX_FOLDER,
	'INBOX': Config.IMAP_INBOX_FOLDER,
	'Trash': Config.IMAP_TRASH_FOLDER,
	'trash': Config.IMAP_TRASH_FOLDER,
	'TRASH': Config.IMAP_TRASH_FOLDER,
	'Drafts': Config.IMAP_DRAFT_FOLDER,
	'Draft': Config.IMAP_DRAFT_FOLDER,
	'draft': Config.IMAP_DRAFT_FOLDER,
	'drafts': Config.IMAP_DRAFT_FOLDER,
	'DRAFTS': Config.IMAP_DRAFT_FOLDER,
	'DRAFT': Config.IMAP_DRAFT_FOLDER,
	'Sent': Config.IMAP_SENT_FOLDER,
	'sent': Config.IMAP_SENT_FOLDER,
	'SENT': Config.IMAP_SENT_FOLDER,
}

defaultFoldersReversed = {
	'INBOX':'Inbox',
	'Sent Messages':'Sent',
	'Deleted Messages': 'Trash',
	'Drafts': 'Draft'
}
