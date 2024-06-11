const mongoose = require('mongoose');
const { Schema } = mongoose;

const pembayaranSchema = new Schema({
    id_pembayaran: { type: Number, required: true, unique: true },
    id_detail_pesanan: { type: Number, required: true },
    metode_pembayaran: { type: String, required: true },
    bukti_pembayaran: { type: String },
    status_pembayaran: { type: String, required: true }
});

const Pembayaran = mongoose.model('Pembayaran', pembayaranSchema);
module.exports = Pembayaran;
