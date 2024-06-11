const mongoose = require('mongoose');
const { Schema } = mongoose;

const metodePengirimanSchema = new Schema({
    id_metode_pengiriman: { type: Number, required: true, unique: true },
    nama_metode: { type: String, required: true },
    deskripsi: { type: String, required: true }
});

const MetodePengiriman = mongoose.model('MetodePengiriman', metodePengirimanSchema);
module.exports = MetodePengiriman;
