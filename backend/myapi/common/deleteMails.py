def deleteMails(Mailbox, uid=None, folder='Deleted Messages'):
	try:
		Mailbox.select_folder(folder, readonly=False)
		mailsToDelete = Mailbox.search() if uid is None else [uid]
		addFlags = Mailbox.add_flags(mailsToDelete, br'\Deleted')
		print(addFlags)
		Mailbox.expunge()
		Mailbox.unselect_folder()
		print('Emails {} deleted'.format(mailsToDelete))
		return True
	except:
		print('Error occure during emails during removal')
		return True