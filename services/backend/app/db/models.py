from .db import db

class User(db.Document):
    email = db.StringField(max_length=255)
    name = db.StringField(max_length=255)
    surname = db.StringField(max_length=255)
    password = db.StringField(max_length=255)
    type = db.StringField(max_length=255)
    orders_status = db.ListField(db.ReferenceField(Status), default=[])
    customer = db.StringField(max_length=255)

class Status(db.Documents):
	name = db.StringField(max_length=255)
	status = db.StringField(max_length=255)

class Order(db.Document):
    author = db.StringField(max_length=255)
    title = db.StringField(max_length=255)
    description = db.StringField(max_length=255)
    dateCreate = db.StringField(max_length=255)
    counter = db.IntField(default = 0)
    data_type = db.StringField(max_length=255)
    data = db.ListField(db.ReferenceField(Data), default=[])

class Data(db.Documents):
	valueObj = db.StringField(max_length=255)
	res = db.ListField(db.ReferenceField(Result), default=[])

class Result(db.Documents):
	answer = db.StringField(max_length=255)
    counter = db.IntField(default = 0)

	