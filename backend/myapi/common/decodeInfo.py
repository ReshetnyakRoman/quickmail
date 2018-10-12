import email

def decode_email_string(encoded_string):
	try:
		decoded_string, encoding = email.header.decode_header(encoded_string)[0]
		if encoding==None:
			pass
		else:
				decoded_string = decoded_string.decode(encoding, 'replace')
	except:
			decoded_string = 'Error during decoding'
	return decoded_string


def decodeInfo(msgFrom):
	print('im dedoedInfo')

	rawMsg = email.header.decode_header(msgFrom)
	print(rawMsg)
	Msg = ''
	for part in rawMsg:
		print('Im part {}'.format(part))
		try:
			partOfMsg = part[0].decode(part[1], 'replace')
		except:
			partOfMsg = str(part[0]).replace("b'","")
		Msg += partOfMsg
	return Msg