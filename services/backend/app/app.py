#from flask_mongoengine import MongoEngine
#import mongoengine
import os

from flask import Flask, request, Response

#from pymongo import MongoClient
from .db.db import initialize_db
from .db.models import Movie

app = Flask (__name__)
app.config.from_object(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/flaskdb'
    #'host':'mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE']

}
initialize_db(app)


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
