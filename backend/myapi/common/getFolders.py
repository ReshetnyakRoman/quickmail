def getFolders(Mailbox):
	folders = Mailbox.list_folders()
	foldersNames = [folder[2] for folder in folders]
	return foldersNames