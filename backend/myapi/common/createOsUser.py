import random, subprocess, os, re
from ..models.users import Users
from transliterate import translit
from flask import current_app as app
import crypt

def generate_password(len):
    return  ''.join(chr([random.randint(48,57), random.randint(65,90), random.randint(97,121)][random.randint(0,2)]) for _ in range(len))

def createOsUser(name):

  osUserPassword = generate_password(16)
  tempName = re.sub(' ', '.', translit(name,'ru', reversed=True)).lower()
  tempName = re.sub("[^\.a-zA-Z0-9_-]+",'', tempName)
  osUserName = tempName
  index = 1
  
  while Users.query.filter_by(osUserName = osUserName).first() is not None:
    osUserName = tempName + '.{}'.format(index)
    index += 1
  encPass = crypt.crypt(osUserPassword)
  cmd = ['/usr/sbin/useradd', '-G','quickmail','-d','/home/{0}'.format(osUserName),'-s','/bin/false', '-p', encPass, osUserName ]

  proc0 = subprocess.Popen(['/bin/echo', app.config['ADMIN_PASSWORD']], stdout=subprocess.PIPE)
  proc1 = subprocess.Popen(['/bin/sudo','-S']+cmd, stdin=proc0.stdout, stderr = subprocess.PIPE, stdout = subprocess.PIPE)
  #proc.stdin.write((bytes(adminPassword,'UTF-8')))
  (stdout, sderr) = proc1.communicate()

  if 'password' not in sderr.decode():
    print('Error: {}'.format(sderr.decode()))
    return (False, {'name':'', 'psw':''})
  else:
    print('User {} created'.format(osUserName))
    return (True, {'name':osUserName, 'psw':osUserPassword})

  