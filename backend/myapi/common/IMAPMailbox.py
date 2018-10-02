from flask import current_app as app
from imapclient import IMAPClient
from config import Config
import ssl

IMAP_HOST = Config.IMAP_HOST
DOMAIN_NAME = Config.DOMAIN_NAME
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE


def makeNewIMAPconnection():
	return IMAPClient(IMAP_HOST,ssl_context=ssl_context, use_uid=True,timeout=10)
