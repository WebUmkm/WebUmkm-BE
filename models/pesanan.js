const mongoose = require('mongoose');
const { Schema } = mongoose;

const pesananSchema = new Schema({
    id_pesanan: { type: Number, required: true, unique: true },
    id_cart: { type: Number, required: true },
    tanggal_pesanan: { type: Date, required: true },
    status_pesanan: { type: String, required: true }
});

const Pesanan = mongoose.model('Pesanan', pesananSchema);
module.exports = Pesanan;
