const mongoose = require('mongoose');
const { Schema } = mongoose;

const produkSchema = new Schema({
    nama_produk: { type: String, required: true },
    harga: { type: Schema.Types.Decimal128, required: true },
    stock: { type: Number, required: true },
    deskripsi: { type: String, required: true },
    gambar: { type: String, required: true },
    kategori: { type: String, required: true }
});

const Produk = mongoose.model('Produk', produkSchema);
module.exports = Produk;
