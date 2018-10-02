def markUnseen(Mailbox, folder, uid, action = True):
	try:
		Mailbox.select_folder(folder, readonly=False)
		if action:
			Mailbox.remove_flags(uid,'\\Seen')
		else:
			Mailbox.set_flags(uid,'\\Seen')
		
		print('Message status changed')
		Mailbox.unselect_folder()
		return True
	except:
		return False 