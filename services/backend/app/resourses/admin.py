from flask import Flask, request, Response, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from app.db.models import User,Order

admin = Blueprint('admin', __name__)

@admin.route('/admin/users',methods=['GET'])
@jwt_required
def get_users():
	user_id = get_jwt_identity()
	user = User.objects().get(id=user_id)
	if user.email == "admin":
		us = User.objects().to_json()
		return Response(us, mimetype="application/json", status=200)
	return {"msg":"log in as admin"},401

@admin.route('/admin/users',methods=['POST'])
@jwt_required
def post_users():
	user_id = get_jwt_identity()
	user = User.objects().get(id=user_id)
	if user.email == "admin":
		body = request.get_json()
		users = User(**body)
		users.save()
		return '', 200
	return {"msg":"log in as admin"},401

@admin.route('/admin/orders',methods=['GET'])
@jwt_required
def get_orders():
	user_id = get_jwt_identity()
	user = User.objects().get(id=user_id)
	if user.email == "admin":
		orders = Order.objects().to_json()
		return Response(orders, mimetype="application/json", status=200)
	return {"msg":"log in as admin"},401

@admin.route('/admin/orders',methods=['POST'])
@jwt_required
def post_orders():
	user_id = get_jwt_identity()
	user = User.objects().get(id=user_id)
	if user.email == "admin":
		body = request.get_json()
		orders = Order(**body)
		orders.save()
		return '', 200
	return {"msg":"log in as admin"},401