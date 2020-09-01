import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from canteenzoom.config import DbEngine_config
from canteenzoom import create_db_engine, create_db_sessionFactory
from canteenzoom.models import createTables, destroyTables
from flask_cors import CORS
from dotenv import load_dotenv
from flask_cors import CORS

from canteenzoom.api import *

load_dotenv()

config_name = 'dev'
engine = create_db_engine(DbEngine_config)
#print(engine)
# destroyTables(engine)



createTables(engine)

SessionFactory = create_db_sessionFactory(engine)
SQLSession = create_db_sessionFactory(engine)

app = Flask(__name__)


CORS(app, supports_credentials=True)
@app.route('/')
def get():
    return "<h1> Hello, Welcome to CanteenZoom backend </h1>"


app.register_blueprint(userBP, url_prefix='/user')
app.register_blueprint(menuBP, url_prefix='/content')
app.register_blueprint(maintainerBP, url_prefix='/staff')




if __name__ == "__main__":
    app.run(debug=True)