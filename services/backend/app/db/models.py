from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class Status(db.Document):
    name = db.StringField(required = True, max_length=255)
    status = db.StringField(required = True, max_length=255)

class User(db.Document):
    email = db.StringField(required = True, max_length=255)
    name = db.StringField(required = True, max_length=255)
    surname = db.StringField(required = True, max_length=255)
    password = db.StringField(required = True, max_length=255)
    type = db.StringField(required = True, max_length=255)
    orders_status = db.ListField(db.ReferenceField(Status), default=[])
    customer = db.StringField(required = True, max_length=255)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Result(db.Document):
    answer = db.StringField(required = True,max_length=255)
    counter = db.IntField(default = 0)

class Data(db.Document):
    valueObj = db.StringField(required = True,max_length=255)
    res = db.ListField(db.ReferenceField(Result), default=[])

class Order(db.Document):
    author = db.StringField()
    title = db.StringField()
    description = db.StringField()
    dateCreate = db.StringField()
    counter = db.IntField()
    data_type = db.StringField()
    data = db.ListField(db.ReferenceField(Data), default=[])