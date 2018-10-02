from ..common.createMessage import createMsg

def saveDraft(Mailbox, emailObj={}, folder='Drafts'):
	#try:
		Mailbox.select_folder(folder, readonly=False)
		draftID = str(emailObj['MessageID']) if 'MessageID' in emailObj else ''
		drafts = Mailbox.search(['TEXT', draftID])

		if drafts:
			for draft in drafts:
				print('Deleting previous version for draft uid: {}\n'.format(draft))
				Mailbox.set_flags(draft,b'\Deleted')
				Mailbox.expunge(draft)

		msg =  createMsg(emailObj)
		print( Mailbox.append(folder, msg.as_string(), b'\\Seen') )
		Mailbox.unselect_folder()
		return True
	#except:
	#	print('Cant save draft')
	#	return False