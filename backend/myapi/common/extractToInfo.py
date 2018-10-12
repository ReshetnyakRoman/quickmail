from ..common.decodeInfo import decode_email_string
from ..common.extractFromInfo import extractFromInfo
import email

def parseEmailAdress(adressString):
	return email.utils.parseaddr(adressString)

def extractToInfo(msgTo):
	ToList = list( map( lambda adr: parseEmailAdress(adr.strip()), msgTo.split(',') ) )
	To = [{'email': adress[1], 'name':decode_email_string(adress[0])} for adress in ToList]
	return To
