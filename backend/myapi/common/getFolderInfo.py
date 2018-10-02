def getFolderInfo(Mailbox,folder):
	Mailbox.select_folder(folder, readonly=True)
	mails = Mailbox.search()
	unreadedMails = Mailbox.search(['NOT','SEEN'])
	Mailbox.unselect_folder()
	LastUID = mails[-1] if mails else 0
	return (LastUID,len(unreadedMails),mails)