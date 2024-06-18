const AlamatPengiriman = require('../models/alamat_pengiriman.js'); // Ensure the correct path to your model

exports.createAlamatPengiriman = async (req, res) => {
    const { deskripsi_penerima, nomor_telepon, provinsi, kabupaten, kecamatan, desa, jalan } = req.body;
    let id_pengguna = req.user._id;

    try {
        // Validate required fields
        if (!deskripsi_penerima || !nomor_telepon || !provinsi || !kabupaten || !kecamatan || !desa || !jalan) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new AlamatPengiriman document
        const alamat = new AlamatPengiriman({
            id_pengguna, // Assuming req.userId is set by authentication middleware
            deskripsi_penerima,
            nomor_telepon,
            provinsi,
            kabupaten,
            kecamatan,
            desa,
            jalan,
            // currentStatus, currentLocation, and lastUpdated are automatically set by the schema's default values
        });

        // Save the document to the database
        await alamat.save();

        // Respond with the created address
        res.status(201).json({ message: 'Alamat pengiriman created successfully', alamat });

    } catch (error) {
        console.error('Error creating alamat pengiriman:', error);
        res.status(500).json({ message: 'An error occurred while creating alamat pengiriman', error: error.message });
    }
};

exports.getAllAlamatPengiriman = async (req, res) => {
    try {
        // Find all addresses for the current user
        const alamat = await AlamatPengiriman.find({ id_pengguna: req.user._id });

        // Respond with the addresses
        res.status(200).json({ message: 'Success', alamat });

    } catch (error) {
        console.error('Error fetching alamat pengiriman:', error);
        res.status(500).json({ message: 'An error occurred while fetching alamat pengiriman', error: error.message });
    }
}
