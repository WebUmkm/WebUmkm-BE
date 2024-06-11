const mongoose = require('mongoose');
const { Schema } = mongoose;

const metodePembayaranSchema = new Schema({
    id_metode_pembayaran: { type: Number, required: true, unique: true },
    nama_metode: { type: String, required: true },
    deskripsi_metode_pembayaran: { type: String, required: true }
});

const MetodePembayaran = mongoose.model('MetodePembayaran', metodePembayaranSchema);
module.exports = MetodePembayaran;
