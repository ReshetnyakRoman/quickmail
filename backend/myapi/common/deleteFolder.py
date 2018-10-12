def deleteFolder(Mailbox, folderName):
	try:
		Mailbox.delete_folder(folderName)
		print('\nFolder %s deleted\n' % (folderName))
		return True
	except:
		print('deleteFolder() Error: No such folder')
		return False
	