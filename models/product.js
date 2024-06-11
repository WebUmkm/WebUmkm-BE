const mongoose = require('mongoose');
const { Schema } = mongoose;

const produkSchema = new Schema({
    nama_menu: { type: String, required: true },
    harga_menu: { type: Schema.Types.Decimal128, required: true },
    stock_menu: { type: Number, required: true },
    description: { type: String, required: true },
    img_menu: { type: String, required: true },
    jenis_menu: { type: String, required: true }
});

const Produk = mongoose.model('Menu', produkSchema);
module.exports = Produk;
