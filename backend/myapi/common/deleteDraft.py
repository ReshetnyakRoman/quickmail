def deleteDraft(Mailbox, draftMessageID, folder='Drafts'):
	print(draftMessageID)
	try:
		Mailbox.select_folder(folder, readonly=False)
		drafts = Mailbox.search(['TEXT', draftMessageID])
		if drafts:
			for draft in drafts:
				print('Deleting previous version for draft uid: {}\n'.format(draft))
				Mailbox.set_flags(draft,b'\Deleted')
				Mailbox.expunge(draft)

		Mailbox.unselect_folder()
		return True
	except:
		print('deleteDraft() Error: Cant delete draft')
		return False