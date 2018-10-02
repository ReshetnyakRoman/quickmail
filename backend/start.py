import os
from myapi.app import create_app, db
from myapi.models.users import Users
from flask_script import Manager, Shell

#===Импортируем переменные окружения из файла anyfile.env
if os.path.exists('.env'):
	print('Importing environment from .env...') 
	for line in open('.env'):
		var = line.strip().split('=') 
		if len(var) == 2:
			os.environ[var[0]] = var[1]
#===Запускаем прибожение
app = create_app(os.getenv('FLASK_CONFIG') or 'development')
manager = Manager(app)

newUser = {
          'userID':123,
          'name': 'roma',
          'url': 'ruls',
          'loginType': 'FB',
          'email': 'email',
          'osUserName': 'osUser[]',
          'password': 'osUser[]',
          'accesToken': 'accessToken',
        }

def make_shell_context():
	return dict(app=app, db=db, Users=Users, newUser=newUser)

@manager.command
def test():
	"""Run the unit tests"""
	import unittest
	tests = unittest.TestLoader().discover('tests')
	unittest.TextTestRunner(verbosity=2).run(tests)

manager.add_command("shell", Shell(make_context=make_shell_context))

if __name__ =='__main__':
	manager.run()