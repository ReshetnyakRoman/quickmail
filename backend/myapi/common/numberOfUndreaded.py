def numberOfUndreaded(Mailbox, folder):
	Mailbox.select_folder(folder, readonly=True)
	messages =  Mailbox.search(['NOT','SEEN'])
	Mailbox.unselect_folder()
	return len(messages)