from flask import Flask, make_response, jsonify, request
from db import Carts

app = Flask(__name__)

# to-do
# Comectar com o banco MongoDB para buscar o carrinho
# Conectar com o PostgreSql para cadastrar o pedido e finalizar a compra

@app.route("/checkout/<id>", methods=["GET"])
def finish_checkout(id):
  pedidoCheckout = {}
  for pedido in Carts:
    if pedido.get("id") == id:
      pedidoCheckout = pedido
      # return make_response(
      #   jsonify(
      #     error="false",
      #     message="Order",
      #     data=pedidoCheckout,
      #   )
      # )

  if pedidoCheckout.get('id'):
    # processar pedido/pagamento
    return make_response(
      jsonify(
        error="false",
        message="Order",
        data=pedidoCheckout,
      )
    )
  else:
    return make_response(
      jsonify(
        error="true",
        message="Order not found",
        id=id
      )
    )


  pedido = request.json
  Carts.append(pedido)

app.run()

# O node vai me enviar o seguinte objeto
# {
#   "id": "f8430c73-ca1b-4aa6-ae9a-6eb8781cd73f",
#   "items": [
#     {
#       "id": 1,
#       "name": "Relogio 01",
#       "price": 47,
#       "_id": "64d449a8912d8db8d699e51c"
#     },
#     {
#       "id": 2,
#       "name": "Relogio 02",
#       "price": 79.9,
#       "_id": "64d449a8912d8db8d699e51d"
#     },
#     {
#       "id": 6,
#       "name": "Relogio 06",
#       "price": 799.9,
#       "_id": "64d449a8912d8db8d699e51e"
#     }
#   ],
#   "user": 1,
#   "total": 926.8,
#   "totalCurrency": "R$ 926,80"
# }