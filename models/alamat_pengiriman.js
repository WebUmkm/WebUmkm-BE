const mongoose = require('mongoose');
const { Schema } = mongoose;


const alamatPengirimanSchema = new Schema({
    id_pengguna: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    deskripsi_penerima: { type: String, required: true },
    nomor_telepon: { type: String, required: true },
    provinsi: { type: String, required: true },
    kabupaten: { type: String, required: true },
    kecamatan: { type: String, required: true },
    desa: { type: String, required: true },
    jalan: { type: String, required: true },
    currentStatus: { type: String, required: true, default: 'Pending' }, // Initial status
    currentLocation: { type: String, required: true, default: 'Warehouse' }, // Initial location
    lastUpdated: { type: Date, default: Date.now } // Timestamp for the last update
});

const collectionName = 'AlamatPengiriman';
const AlamatPengiriman = mongoose.model('AlamatPengiriman', alamatPengirimanSchema, collectionName);
module.exports = AlamatPengiriman;
