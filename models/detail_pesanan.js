const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailPesananSchema = new Schema({
    id_detail_pesanan: { type: Number, required: true, unique: true },
    id_pesanan: { type: Number, required: true },
    id_produk: { type: Number, required: true },
    jumlah: { type: Number, required: true }
});

const DetailPesanan = mongoose.model('DetailPesanan', detailPesananSchema);
module.exports = DetailPesanan;
