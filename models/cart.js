const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    id_product: { type: Schema.Types.ObjectId, ref: "Produk", required: true },
    id_pengguna: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    jumlah_product_cart: { type: Number, required: true },
    total_pesanan: { type: Schema.Types.Decimal128, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
