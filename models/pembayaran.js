const mongoose = require('mongoose');
const { Schema } = mongoose;

const pembayaranSchema = new Schema({
    id_detail_pesanan: { type: Schema.Types.ObjectId, ref: 'DetailPesanan', required: true },
    id_metode_pembayaran: { type: Schema.Types.ObjectId, ref: 'MetodePembayaran', required: true },
    bukti_pembayaran: { type: String },
    status_pembayaran: { type: String, required: true }
});

const collectionName = 'Pembayaran';
const Pembayaran = mongoose.model('Pembayaran', pembayaranSchema, collectionName);
module.exports = Pembayaran;
