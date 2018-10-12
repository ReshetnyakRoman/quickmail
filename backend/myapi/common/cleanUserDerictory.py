import random, subprocess

def cleanUserDerictory(userID):
	cmd = subprocess.Popen(
		['/bin/rm', '-fr','/home/quickmail/attachments/{0}'.format(userID)],
		stdin=subprocess.PIPE,
		stderr = subprocess.PIPE, 
		stdout = subprocess.PIPE)
	(stdout, sderr) = cmd.communicate()
	if sderr:
		print('Error: {}'.format(sderr))
		return False
	else:
		print('User {} folder deleted'.format(userID))
		return True

