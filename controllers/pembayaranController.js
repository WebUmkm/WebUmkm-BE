const Pembayaran = require("../models/pembayaran.js");
const Pesanan = require("../models/pesanan.js");
const path = require("path");
const fs = require("fs");

// Function to update the payment proof
exports.updateBuktiPembayaran = async (req, res) => {
  const { _id } = req.params; // Get the payment ID from request parameters
  const { file } = req; // Multer stores the uploaded file info in `req.file`

  try {
    // Find the payment document by ID
    const payment = await Pembayaran.findById(_id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check if a file is uploaded
    if (!file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Update the payment document with the new proof image path
    payment.bukti_pembayaran = `/img/${file.filename}`;
    payment.status_pembayaran = "Success";
    await payment.save();

    res.status(200).json({
      status: 200,
      message: "Payment proof updated successfully",
      data: {
        id_pembayaran: payment._id,
        bukti_pembayaran: payment.bukti_pembayaran,
        status_pembayaran: payment.status_pembayaran,
      },
    });
  } catch (error) {
    console.error("Error updating payment proof:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getPaymentsById = async (req, res) => {
  const { _id } = req.params;
  try {
    const payment = await Pembayaran.findById(_id).select(
      "id_pengguna metode_pembayaran status_pembayaran"
    );

    if (!Pembayaran) {
      return res.status(404).send({
        message: "Product not found",
        error: 404,
      });
    }
   // Cari data order berdasarkan id_pembayaran
   const order = await Pesanan.findOne({ id_pembayaran: _id }).select(
    "id_MetodePembayaran id_alamat_pengiriman id_pembayaran id_pengguna metode_pengambilan detail_pesanan total_harga tanggal_pesanan status_pesanan isActive"
  );

  if (!order) {
    return res.status(404).send({
      message: "Order not found",
      error: 404,
    });
  }

  // Gabungkan data dari kedua tabel menjadi satu respons
  res.status(200).json({
    message: "Payment and Order found",
    data: {
      payment: {
        id_pembayaran: payment._id,
        id_pengguna: payment.id_pengguna,
        metode_pembayaran: payment.metode_pembayaran,
        status_pembayaran: payment.status_pembayaran,
        bukti_pembayaran: payment.bukti_pembayaran,
      },
      order: {
        id_MetodePembayaran: order.id_MetodePembayaran,
        id_alamat_pengiriman: order.id_alamat_pengiriman,
        id_pembayaran: order.id_pembayaran,
        id_pengguna: order.id_pengguna,
        metode_pengambilan: order.metode_pengambilan,
        detail_pesanan: order.detail_pesanan,
        total_harga: order.total_harga,
        tanggal_pesanan: order.tanggal_pesanan,
        status_pesanan: order.status_pesanan,
        isActive: order.isActive,
      },
    },
  });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
