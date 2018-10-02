def deleteFolder(Mailbox, folderName):
	try:
		Mailbox.delete_folder(folderName)
		print('Folder %s deleted' % (folderName))
		return True
	except:
		print('No such folder')
		return False
	