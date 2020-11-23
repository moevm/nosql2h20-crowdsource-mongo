from flask import Flask, request, Response, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from app.db.models import User,Order

admin = Blueprint('admin', __name__)

@admin.route('/admin/users',methods=['GET'])
@jwt_required
def get_users():
	user_id = get_jwt_identity()
	if str(user_id) == str(User.objects().get(email="admin").id):
		us = User.objects().to_json()
		return Response(us, mimetype="application/json", status=200)
	return "",401

@admin.route('/admin/users',methods=['POST'])
@jwt_required
def post_users():
	user_id = get_jwt_identity()
	if str(user_id) == str(User.objects().get(email="admin").id):
		body = request.get_json()
		users = User(**body)
		users.save()
		return '', 200

@admin.route('/admin/orders',methods=['GET'])
@jwt_required
def get_orders():
	user_id = get_jwt_identity()
	adid = User.objects().get(email="admin").id
	if str(user_id) == str(adid):
		orders = Order.objects().to_json()
		return Response(orders, mimetype="application/json", status=200)
	return "",401

@admin.route('/admin/orders',methods=['POST'])
@jwt_required
def post_orders():
	user_id = get_jwt_identity()
	if user_id == User.objects().get(email="admin").id:
		body = request.get_json()
		orders = Order(**body)
		orders.save()
		return '', 200