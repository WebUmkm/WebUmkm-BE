const mongoose = require('mongoose');
const { Schema } = mongoose;

const transaksiSchema = new Schema({
    id_transaksi: { type: Number, required: true, unique: true },
    id_pembayaran: { type: Number, required: true },
    tanggal_transaksi: { type: Date, required: true },
    total_bayar: { type: Number, required: true }
});

const Transaksi = mongoose.model('Transaksi', transaksiSchema);
module.exports = Transaksi;
