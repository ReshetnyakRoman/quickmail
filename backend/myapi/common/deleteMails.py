def deleteMails(Mailbox, uid=None, folder='Deleted Messages'):
	try:
		Mailbox.select_folder(folder, readonly=False)
		mailsToDelete = Mailbox.search() if uid is None else [uid]
		addFlags = Mailbox.add_flags(mailsToDelete, br'\Deleted')
		Mailbox.expunge()
		Mailbox.unselect_folder()
		print('\nEmails {} deleted\n'.format(mailsToDelete))
		return True

	except:
		print('deleteMails() Error:  Cant remove emails')
		return True