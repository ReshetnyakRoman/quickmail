from ..common.decodeInfo import decodeInfo
from ..common.extractFromInfo import extractFromInfo
import email

def parseEmailAdress(adressString):
	return email.utils.parseaddr(adressString)

def extractToInfo(msgTo):
	ToList = list( map( lambda adr: parseEmailAdress(adr.strip()), decodeInfo(msgTo).split(',') ) )
	To = [{'email': adress[1], 'name':adress[0]} for adress in ToList]
	return To