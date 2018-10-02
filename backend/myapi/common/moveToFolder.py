def moveToFolder(Mailbox, fromFolder, toFolder, uid):
	try:
		Mailbox.select_folder(fromFolder, readonly=False)
		Mailbox.move(messages=[uid],folder=toFolder)
		messages = Mailbox.search()
		Mailbox.unselect_folder()
		print('Email %s moved to %s' % (uid, toFolder))
		return True
	except:
		return False