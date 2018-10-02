import imaplib
import codecs
from imapclient import IMAPClient, imap_utf7
from six import text_type, binary_type

def _quote(arg):
  if isinstance(arg, text_type):
      arg = arg.replace('\\', '\\\\')
      arg = arg.replace('"', '\\"')
      q = '"'
  else:
      arg = arg.replace(b'\\', b'\\\\')
      arg = arg.replace(b'"', b'\\"')
      q = b'"'
  return q + arg + q


def _normalise_folder(folder_name):
    if isinstance(folder_name, binary_type):
        folder_name = folder_name.decode('ascii')
    folder_name = imap_utf7.encode(folder_name)
    return _quote(folder_name)

def searchEmails(MAIL_USERNAME,MAIL_PASSWORD,IMAP_HOST,string, folders=['INBOX'] ):
	totalUIDs = {}
	try:
		M = imaplib.IMAP4_SSL(IMAP_HOST, 993)
		M.login(MAIL_USERNAME, MAIL_PASSWORD)
		
		for folder in folders:
			folderNormalised = _normalise_folder(folder)
			#print( M.select('"{}"'.format(folder)) )
			M.select(folderNormalised)
			
			rawResponse = M.uid('search','CHARSET', 'UTF-8', 'TEXT' ,'"{}"'.format(string).encode('UTF-8') )
			
			uidString = rawResponse[1][0].decode("utf-8")
			if len(uidString):
				UIDs = list( map(lambda x:int(x), uidString.split(' ')) ) 
			else:
				UIDs = []
			totalUIDs[folder] = UIDs
		
		M.logout()
		print(totalUIDs)
	except:
		pass
	return totalUIDs

