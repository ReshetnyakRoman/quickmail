import email

def decodeInfo(msgFrom):
	rawMsg = email.header.decode_header(msgFrom)
	Msg = ''
	for part in rawMsg:
		try:
			partOfMsg = part[0].decode('utf8', 'replace')
		except:
			partOfMsg = str(part[0])
		Msg += partOfMsg
	return Msg