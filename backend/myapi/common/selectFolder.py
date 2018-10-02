def selectFolder(Mailbox, folder):
	response = Mailbox.select_folder(folder, readonly=False)
	Mailbox.unselect_folder()
	nextUID = response[b'UIDNEXT']
	numberOfMails = response[b'EXISTS']
	return [nextUID,numberOfMails]