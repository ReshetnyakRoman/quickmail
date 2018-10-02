from . import main
from flask import g

@main.route('/')
def index():
  if 'email' not in g:
    g.email = 'Nothing sent yet'
  return '<h1>Server is running</h1>{0}'.format(g.email)

