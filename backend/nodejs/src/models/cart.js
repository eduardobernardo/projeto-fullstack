const mongoose = require("../database");

const CartSchema = new mongoose.Schema({
  id: String,
  user: Number,
  items: [
    {
      id: Number,
      name: String,
      price: Number
    }
  ]

});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;