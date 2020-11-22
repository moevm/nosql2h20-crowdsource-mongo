import os
from flask import Flask
from flask_bcrypt import Bcrypt
from app.db.db import initialize_db
from app.db.models import User
from app.resourses.order import orders
from app.resourses.user import users
from flask_jwt_extended import JWTManager

app = Flask (__name__)
app.config['JWT_SECRET_KEY']= 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.url_map.strict_slashes = False

app.config['MONGODB_SETTINGS'] = {
    'name' : 'name',
    'host' : 'mongodb',
    'port' : 27017
}
app.config["SECRET_KEY"] = "SECRET_KEY"


db = initialize_db(app)

app.register_blueprint(orders)
app.register_blueprint(users)

@app.route('/')
def check_flask():
    return "Flask is ok"

if __name__ == '__main__':
    app.run ()