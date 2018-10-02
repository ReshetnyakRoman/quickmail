def createFolder(Mailbox, folderName):
	#try:
		print(folderName)
		Mailbox.create_folder(folderName)
		print('Folder %s created' % (folderName))
		return True
	#except:
	#	print('Coudnt crate folder')
	#	return False