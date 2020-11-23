from flask import Flask, request, Response, Blueprint
from app.db.models import Order, User
from flask_jwt_extended import jwt_required, get_jwt_identity

orders = Blueprint('orders', __name__)

@orders.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.objects().to_json()
    return Response(orders, mimetype="application/json", status=200)


@orders.route('/orders', methods=['POST'])
@jwt_required
def add_order():
    user_id = get_jwt_identity()
    body = request.get_json()
    user = User.objects.get(id=user_id)
    order = Order(**body,author = user_id)
    order.save()
    user.update(push__orders_status={order.title:"posted"})
    id = order.id
    return {'id': str(id)}, 200

@orders.route('/orders/<id>', methods=['PUT'])
@jwt_required
def update_order(id):
    user_id = get_jwt_identity()
    order = Order.objects.get(id = id, author=user_id)
    body = request.get_json()
    print(body.data)
    if order.author == user_id:
        Order.objects.get(id=id).update(**body)
    else:
        # need to fix for security
        Order.objects.get(id=id).update(**body)
    return '', 200

@orders.route('/orders/<id>', methods=['DELETE'])
@jwt_required
def delete_order(id):
    user_id = get_jwt_identity()
    order = Order.objects.get(id=id)
    user = User.objects.get(id=user_id)
    if order.author == user_id:
        order.delete()
        user.update(pull__orders_status= {order.title:"posted"})
    else:
        user.update(pull__orders_status= {order.title:"ended"})
        user.update(pull__orders_status= {order.title:"notended"})
    return '',200


@orders.route('/orders/<id>',methods=['GET'])
def get_order(id):
    order = Order.objects.get(id=id).to_json()
    return Response(order, mimetype="application/json", status=200)
