const mongoose = require('mongoose');
const { Schema } = mongoose;

const pesananSchema = new Schema({
    id_cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    id_MetodePembayaran: { type: Schema.Types.ObjectId, ref: 'MetodePembayaran', required: true },
    tanggal_pesanan: { type: Date, required: true },
    status_pesanan: { type: String, required: true },
    isActive: { type: String, default: true }
});

const collectionName = 'Pesanan';
const Pesanan = mongoose.model('Pesanan', pesananSchema, collectionName);
module.exports = Pesanan;
