import email
from ..common.getLastUID import getLastUID
from ..common.createEmailObj import createEmailObj


def getEmailList(Mailbox, lastShownUID, stepsBack, folder='INBOX', UserID=''):
	lastUID = getLastUID(Mailbox,folder)
	response = Mailbox.select_folder(folder, readonly=False)
	#numberOfMails = response[b'EXISTS'] 
	
	emailList = []

	allMessages = Mailbox.search()
	print('All message UISs in {}: {} '.format(folder, allMessages))

	if len(allMessages) == 0:
		return (emailList,0)
	
	if lastShownUID == 0:
		return (emailList, allMessages[0])
	
	#Calculating boundries for emaillist request
	if stepsBack != 0:
		#count back from lastShownUID
		if lastShownUID == lastUID:
			end = None
			start = len(allMessages) - stepsBack  if len(allMessages) > 0 and len(allMessages) - stepsBack > 0 else None
		else:
			try:
				index = allMessages.index(lastShownUID)
			except:
				#finding nearest UID to given lastShownUID
				
				print('Last shown UID {} not in the folder {}'.format(lastShownUID,folder))
				allMessagesTemp = allMessages.copy()
				allMessagesTemp.append(lastShownUID)
				allMessagesTemp = sorted( allMessagesTemp )
				indexTemp = allMessagesTemp.index(lastShownUID)		
				
				if indexTemp == 0:
					return (emailList,allMessages[0])
				else:
					index = indexTemp
			
			end =  index
			start = end - stepsBack if end - stepsBack > 0 else None
			print('Start :{} end: {}'.format(start,end))
	else:
		#return all latest emails up to lastShownUID
		
		try:
			index = allMessages.index(lastShownUID)
		except:
			print('Last shown UID {} not in the folder {}'.format(lastShownUID,folder))
			#finding nearest UID to given lastShownUID
			allMessagesTemp = allMessages.copy()
			allMessagesTemp.append(lastShownUID)
			allMessagesTemp = sorted( allMessagesTemp )
			indexTemp = allMessagesTemp.index(lastShownUID)	
			index = indexTemp
		
		start = index
		end = None

	selectedMessages = allMessages[start:end]
	
	if len(selectedMessages) == 0:
		return (emailList,lastShownUID)
	
	print('Getting e-mails {} from {}:'.format(selectedMessages, folder))
	
	lastShownUID = selectedMessages[0] if selectedMessages[0] != allMessages[0] else allMessages[0]

	rawResponse = Mailbox.fetch(selectedMessages,['FLAGS','BODY.PEEK[]'])
	for uid in rawResponse:
		try:
			print('getting uid {}'.format(uid))
			isUnreaded = False if b'\\Seen' in rawResponse[uid][b'FLAGS'] else True
			msg = email.message_from_bytes(rawResponse[uid][b'BODY[]'])
			emailObj = createEmailObj(msg,uid,UserID, isUnreaded)
			emailList.append(emailObj)
			print('email {} successfully received'.format(uid))
		except:
			print('getEmailList() Error: cant get email: {}'.format(uid))
			pass
	Mailbox.unselect_folder()

	emailList.sort(key = lambda a: a['receivingDate'], reverse =  True)
	#print(emailList)
	print('------------EMAIL LIST SUCCESSFULLY RECEIVED-----------\n')

	return (emailList,lastShownUID)

def getDescretEmailList(Mailbox, emails, folder, UserID=''):	
	Mailbox.select_folder(folder, readonly=False)
	emailList = []
	rawResponse = Mailbox.fetch(emails,['FLAGS','BODY.PEEK[]'])
	for uid in rawResponse:
		try:
			isUnreaded = False if b'\\Seen' in rawResponse[uid][b'FLAGS'] else True
			msg = email.message_from_bytes(rawResponse[uid][b'BODY[]'])
			emailObj = createEmailObj(msg,uid,UserID,isUnreaded)
			emailList.append(emailObj)
		except:
			print('getDescretEmailList() Error: cant get email: {}'.format(uid))
			pass
	Mailbox.unselect_folder()

	emailList.sort(key = lambda a: a['receivingDate'], reverse =  True)
	
	print('Searched emails successfully received.\n')
	
	return emailList