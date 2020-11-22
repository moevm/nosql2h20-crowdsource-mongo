from flask import Flask, request, Response, Blueprint
from app.db.models import Order
from flask_jwt_extended import jwt_required

orders = Blueprint('orders', __name__)

@orders.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.objects().to_json()
    return Response(orders, mimetype="application/json", status=200)


@orders.route('/orders', methods=['POST'])
@jwt_required
def add_order():
    body = request.get_json()
    order = Order(**body).save()
    id = order.id
    return {'id': str(id)}, 200

@orders.route('/orders/<id>', methods=['PUT'])
@jwt_required
def update_order(id):
    body = request.get_json()
    Order.objects.get(id=id).update(**body)
    return '', 200

@orders.route('/orders/<id>', methods=['DELETE'])
@jwt_required
def delete_order(id):
    movie = Order.objects.get(id=id).delete()
    return '', 200

@orders.route('/orders/<id>',methods=['GET'])
def get_order(id):
    order = Order.objects.get(id=id).to_json()
    return Response(order, mimetype="application/json", status=200)