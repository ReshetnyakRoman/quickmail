import os
from config import DevelopmentConfig as Config
from ..common.decodeInfo import decodeInfo
from werkzeug import secure_filename
from transliterate import translit

def get_subFolders(dir):
    return [name for name in os.listdir(dir)
            if os.path.isdir(os.path.join(dir, name))]

def saveAttachment(part, uid, userID, token=''):
	filename = secure_filename( translit(decodeInfo(os.path.basename(part.get_filename())),'ru', reversed=True) )
	identityPart = str(userID)+'/'+str(uid)+'/'
	securePart = identityPart + token
	
	if not os.path.exists(Config.ATTACHMENT_SAVE_PATH + identityPart):
		os.makedirs(Config.ATTACHMENT_SAVE_PATH+securePart)
	else:
		subfolder = get_subFolders(Config.ATTACHMENT_SAVE_PATH + identityPart)
		if len(subfolder):
			securePart = identityPart + subfolder[0]
		else:
			os.makedirs(Config.ATTACHMENT_SAVE_PATH+securePart)

			
	basePath = Config.ATTACHMENT_SAVE_PATH+securePart		
	fullAttachmentPath = os.path.join(basePath, filename)
	url = os.path.join(Config.HTTP_PROTOCOL+'://'+Config.SUB_DOMAIN_NAME+'/attachments/'+securePart, filename)

	if not os.path.isfile(fullAttachmentPath):
		print('saving attachments for uid {} to {}'.format(uid, fullAttachmentPath) )
		fp = open(fullAttachmentPath, 'wb')
		fp.write(part.get_payload(decode=True))
		fp.close()
	
	size = os.path.getsize(fullAttachmentPath)
		
	return [filename, fullAttachmentPath, url, size]