def createFolder(Mailbox, folderName):
	try:
		Mailbox.create_folder(folderName)
		print('\nFolder %s created\n' % (folderName))
		return True
	except:
		print('createFolder() Error: Coudnt crate folder')
		return False