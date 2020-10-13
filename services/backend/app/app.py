from flask_mongoengine import MongoEngine
import mongoengine
import os

from flask import Flask, request, Response

from pymongo import MongoClient

app = Flask (__name__)
app.config.from_object(__name__)
app.config['MONGODB_SETTINGS'] = {
    'name' : 'name',
    'host' : 'mongodb',
    'port' : 27017
}
app.config["SECRET_KEY"] = "SECRET_KEY"

def initialize_db(app):
    db = MongoEngine(app)
    return db

db = initialize_db(app)

class Movie(db.Document):
    name = db.StringField(required=True, unique=True)
    casts = db.ListField(db.StringField(), required=True)
    genres = db.ListField(db.StringField(), required=True)

@app.route('/')
def check_flask():
    return "Flask is ok"


@app.route('/movies')
def get_movies():
    movies = Movie.objects().to_json()
    return Response(movies, mimetype="application/json", status=200)


@app.route('/movies', methods=['POST'])
def add_movie():
    body = request.get_json()
    movie =  Movie(**body).save()
    id = movie.id
    return {'id': str(id)}, 200

@app.route('/movies/<id>', methods=['PUT'])
def update_movie(id):
    body = request.get_json()
    Movie.objects.get(id=id).update(**body)
    return '', 200

@app.route('/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.objects.get(id=id).delete()
    return '', 200

@app.route('/movies/<id>')
def get_movie(id):
    movies = Movie.objects.get(id=id).to_json()
    return Response(movies, mimetype="application/json", status=200)

if __name__ == '__main__':
    app.run ()
