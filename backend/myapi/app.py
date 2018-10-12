from flask import Flask, Blueprint, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
import os
from config import config
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager


db = SQLAlchemy()

from .resources.send import send
from .resources.auth import auth, logout
from .resources.emailList import emailList
from .resources.updateMailBoxData import updateMailBoxData
from .resources.email import email
from .resources.markUnread import markUnread
from .resources.move import move
from .resources.deleteEmail import deleteEmail
from .resources.operateWithFolders import operateWithFolders
from .resources.draft import draft
from .resources.search import search

def create_app(config_name):
	app = Flask(__name__)
	CORS(app)
	app.config.from_object(config[config_name])
	jwt = JWTManager(app)
	config[config_name].init_app(app)
	db.init_app(app)

#=======REST API DESRIPTION=======#
#POST /<folder> -  create folder
#DELETE /<folder> - remove folder with all emails
#GET /folder/ - give list of emails in particular folder (read list of items)
#GET /folder/<uid> - give particular email in folder (read item)
#PUT /folder/<uid>/newfolder - move email to new folder (move item)
#DELETE /trash - empty trashfolder (delete list of items)
#DELETE /trash/<uid> - delete one email (delete item)
#PATCH /folder/<uid> - mark unreaded (change item property)
#PUT /drafts/<uid> - create and update draft (create & change item content)
#DELETE /drafts/<uid> - Delete draft when message sent
#POST /send send email (sent item away)
#POST /auth user authorization
#POST /auth user authorization
#GET /update - update Mailboxes data (last email UID, number of unseen)
#GET /search?keyword='sdfsd'

	api_bp = Blueprint('api', __name__)
	api = Api(api_bp)
	app.register_blueprint(api_bp, url_prefix='/api/v1')
	api.add_resource(auth, '/auth',)
	api.add_resource(logout, '/logout') 
	api.add_resource(send, '/send') 
	api.add_resource(operateWithFolders, '/<folder>',) 
	api.add_resource(emailList, '/<folder>/',) 
	api.add_resource(draft, '/draft','/draft/','/draft/<draftMessageID>')
	api.add_resource(deleteEmail, '/trash/<int:uid>', '/trash/', '/trash')
	api.add_resource(email, '/<folder>/<int:uid>')
	api.add_resource(markUnread, '/<folder>/<int:uid>')
	api.add_resource(move, '/<folder>/<int:uid>/<newfolder>')
	api.add_resource(updateMailBoxData, '/update') 
	api.add_resource(search, '/search') 
	
	return app

