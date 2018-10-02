from flask import current_app as app
import json
import requests
import hashlib

def isFBUserValid(content):
  return json.loads(
      requests.get("https://graph.facebook.com/debug_token?input_token={0}&access_token={1}|{2}"
      .format(content['accessToken'],app.config['FB_APP_ID'],app.config['FB_SECRET']) ).text
      )['data']['is_valid']

def isVKUserValid(content):
  secretKey = app.config['VK_SECRET']
  sig = str(content['accessToken']['sig'])
  expire = str(content['accessToken']['expire'])
  secret = str(content['accessToken']['secret'])
  sid = str(content['accessToken']['sid'])
  mid = str(content['accessToken']['mid'])

  string = "expire=" + expire + "mid=" + mid + "secret=" + secret + "sid=" + sid + secretKey
  stringHash = hashlib.md5(string.encode('utf-8')).hexdigest()

  return True if sig == stringHash else False