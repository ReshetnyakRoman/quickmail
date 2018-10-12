def moveToFolder(Mailbox, fromFolder, toFolder, uid):
	try:
		Mailbox.select_folder(fromFolder, readonly=False)
		Mailbox.move(messages=[uid],folder=toFolder)
		messages = Mailbox.search()
		Mailbox.unselect_folder()
		print('\nEmail %s moved to %s \n' % (uid, toFolder))
		return True
	except:
		print('moveToFolder() Error: Cant move to other folder')
		return False