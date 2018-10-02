from werkzeug.security import generate_password_hash, check_password_hash
import random, subprocess, os, re
from ..models.users import Users
from transliterate import translit
from flask import current_app as app


def createOsUser(name):
  osUserPassword = generate_password_hash(str(random.randint(1000000,10000000)))
  tempName = re.sub(' ', '.', translit(name,'ru', reversed=True)).lower()
  osUserName = tempName
  index = 1
  adminPassword = app.config['ADMIN_PASSWORD']

  while Users.query.filter_by(osUserName = osUserName).first() is not None:
    osUserName = tempName + '.{}'.format(index)
    index += 1
  
  cmd = subprocess.Popen(
  	['sudo', 'useradd', '-G','quickmail','-d','/home/{0}'.format(osUserName),'-s','/bin/false', '-p', osUserPassword, osUserName ],
  	stdin=subprocess.PIPE,
  	stderr = subprocess.PIPE, 
  	stdout = subprocess.PIPE)
  cmd.stdin.write(adminPassword)
  (stdout, sderr) = cmd.communicate()

  if sderr:
    print('Error: {}'.format(sderr))
    return (False, {'name':'', 'psw':''})
  else:
    print('User {} identified by: "{}" created'.format(osUserName,osUserPassword))
    return (True, {'name':osUserName, 'psw':osUserPassword})

  