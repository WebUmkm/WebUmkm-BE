const mongoose = require('mongoose');
const { Schema } = mongoose;

const pengirimanSchema = new Schema({
    id_pengiriman: { type: Number, required: true, unique: true },
    id_alamat: { type: Number, required: true },
    id_pesanan: { type: Number, required: true },
    tanggal_pengiriman: { type: Date, required: true },
    status_pengiriman: { type: String, required: true }
});

const Pengiriman = mongoose.model('Pengiriman', pengirimanSchema);
module.exports = Pengiriman;
