from ..app import db
from sqlalchemy import event
from sqlalchemy.orm import backref


class Users(db.Model):
	__tablename__='users'
	id=db.Column(db.Integer, primary_key=True)
	userID=db.Column(db.String(128), unique=True)
	name = db.Column(db.String(128)) # full name in socials
	url = db.Column(db.String(512)) # url for user avatar
	loginType = db.Column(db.String(128)) # 'FB' or 'VK'
	email = db.Column(db.String(128)) # equal to: osUsername + '@' +domain name
	osUserName = db.Column(db.String(128)) #equal to: name with spaces replaced with "." and lowered cases.
	password = db.Column(db.String(512)) #psw set to osUser for accessing email server account
	accesToken = db.Column(db.String(512)) #token to check each of user request for authentication
	secretKey = db.Column(db.String(512)) #key to decode token

	def __repr__(self):
		return '<User %s with ID: %s registred with %s, got email: %s>' % (self.name, self.userID, self.loginType, self.email)

	def register(user):
		isUserRegistred = Users.query.filter_by(userID=user['userID']).first()
		if isUserRegistred is not None:
			print('User %s already register in Database' % user['name'])
			return False
		else:
			newUser = Users(
				userID = user['userID'],
				name = user['name'],
				url = user['url'],
				loginType = user['loginType'],
				email = user['email'],
				osUserName = user['osUserName'],
				password = user['password'],
				accesToken = user['accesToken'],
				secretKey = user['secretKey']
				)
			db.session.add(newUser)
			db.session.commit()
			
		return print('User %s registered in Database' % user['name'])

	def isRegistred(id):
		if Users.query.filter_by(userID=id).first() is not None:
			return True
		else:
			return False

	def getTocken(id):
		user = Users.query.filter_by(userID=id).first()
		if user is not None:
			return user.accesToken
		else:
			return print('User doesnt registered')