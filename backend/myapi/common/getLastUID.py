def getLastUID(Mailbox, folder):
	Mailbox.select_folder(folder, readonly=True)
	mails = Mailbox.search()
	Mailbox.unselect_folder()
	LastUID = mails[-1] if mails else 0
	return LastUID