const Produk = require("../models/product.js");
const { storage, imageFilter, upload } = require("../middleware/image.js");

exports.createProduct = async (req, res) => {
  const { nama_produk, harga, stock, deskripsi, kategori } = req.body;
  const gambar = req.file ? req.file.filename : null; // Ambil nama file gambar jika tersedia
  try {
    const newProduct = new Produk({
      nama_produk,
      harga,
      stock,
      deskripsi,
      gambar,
      kategori,
    });
    await newProduct.save();
    res.status(201).json({
      status: 201,
      message: "Product created successfully",
      data: {
        nama_produk: newProduct.nama_produk,
        harga: newProduct.harga,
        stock: newProduct.stock,
        deskripsi: newProduct.deskripsi,
        gambar: newProduct.gambar,
        kategori: newProduct.kategori,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const produk = await Produk.find();
    res.status(200).json({
      message: "access defined",
      data: produk,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

exports.getProductByKategori = async (req, res) => {
  const { kategori } = req.params;
  try {
    const products = await Produk.find({ kategori: kategori }).select(
      "_id nama_produk harga stock deskripsi gambar"
    );

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "Products not found",
        error: 404,
      });
    }

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const _id = req.params._id;

  try {
    const product = await Produk.findById(_id).select(
      "_id nama_produk harga stock deskripsi gambar kategori"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "access defined",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}