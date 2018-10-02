from config import Config

def getSubFolders(Mailbox):
	folders = Mailbox.list_folders()
	defaultFolders = [Config.IMAP_SENT_FOLDER,Config.IMAP_DRAFT_FOLDER,Config.IMAP_TRASH_FOLDER,'INBOX']
	subFolders = [folder[2] for folder in folders if folder[2] not in defaultFolders]
	return subFolders