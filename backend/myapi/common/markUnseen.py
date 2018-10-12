def markUnseen(Mailbox, folder, uid, action = True):
	actionType = ''
	try:
		Mailbox.select_folder(folder, readonly=False)
		if action:
			Mailbox.remove_flags(uid,'\\Seen')
			actionType = 'Unseen'
		else:
			Mailbox.set_flags(uid,'\\Seen')
			actionType = 'Seen'

		print('\nMessage {} status changed to {}\n'.format(uid, actionType))
		Mailbox.unselect_folder()
		return True
	except:
		print('markUnseen() Error:Cant change message status')
		return False 