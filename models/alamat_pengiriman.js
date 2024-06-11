const mongoose = require('mongoose');
const { Schema } = mongoose;

const alamatPengirimanSchema = new Schema({
    id_alamat: { type: Number, required: true, unique: true },
    id_pengguna: { type: Number, required: true },
    deskripsi_penerima: { type: String, required: true },
    nomor_telepon: { type: String, required: true },
    provinsi: { type: String, required: true },
    kabupaten: { type: String, required: true },
    kecamatan: { type: String, required: true },
    desa: { type: String, required: true },
    jalan: { type: String, required: true }
});

const AlamatPengiriman = mongoose.model('AlamatPengiriman', alamatPengirimanSchema);
module.exports = AlamatPengiriman;
