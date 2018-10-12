from email.message import EmailMessage
import smtplib
from flask import current_app as app
import asyncio

def welcome_message(email):
  smpt_server = smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT'])
  smpt_server.login(app.config['SMTP_NAME'], app.config['SMTP_PASSWORD'])  
  
  msg = EmailMessage()
  msg['To'] = email
  msg['From'] = 'QuickMail Team <registration@stepanich.ru>'
  msg['Subject'] = 'Welcome to QuickMail service!'
  message = 'User registred'
  htmlBody = "<p>Welcome to <strong>QuickMail</strong>!</p>\n<p><em>We are glad you are using our service!&nbsp;</em></p>\n<p><em>Out team hope you'll enjoy it!</em></p>\n<p><br></p>\n<p><br></p>"
  msg.add_alternative(htmlBody, subtype='html', cte='base64')

  smpt_server.send_message(msg)
  smpt_server.quit()
  pass