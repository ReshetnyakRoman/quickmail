from ..common.decodeInfo import decodeInfo
import email

def extractFromInfo(msgFrom):
	From  = decodeInfo(msgFrom)
	return email.utils.parseaddr(From)