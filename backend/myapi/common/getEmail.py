import email
from ..common.createEmailObj import createEmailObj

def getEmail(Mailbox, folder, uid, keepUnseen = True):
	try:
		Mailbox.select_folder(folder, readonly=False)
		if keepUnseen:
			rawResponse = Mailbox.fetch(uid,['BODY.PEEK[]'])
			msg = email.message_from_bytes(rawResponse[uid][b'BODY[]'])
		else:
			rawResponse = Mailbox.fetch(uid,['RFC822'])
			msg = email.message_from_bytes(rawResponse[uid][b'RFC822'])
		
		emailObj = createEmailObj(msg,uid,keepUnseen)

		Mailbox.unselect_folder()
		return (True, emailObj)
	except:
		emailObj = {
			'emailId': uid,
			'from': [ {'email': 'error', 'name': ''} ],
			'cc': '',
			'to': '',
			'subject': 'Error during reciving email',
			'receivingDate': '',
			'body': '',
			'attachments':[],
			'avatar':'',
		}
		print('Error during reciving email uid: {}'.format(uid))

		Mailbox.unselect_folder()
		return (False, emailObj)