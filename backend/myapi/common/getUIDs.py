def getUIDs(Mailbox, folder):
	Mailbox.select_folder(folder, readonly=True)
	UIDs = Mailbox.search()
	Mailbox.unselect_folder()
	return UIDs