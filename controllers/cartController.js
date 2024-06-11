const Cart = require("../models/cart.js");
const Produk = require("../models/product.js");

exports.createCart = async (req, res) => {
    const { id_product, jumlah_product_cart, total_pesanan } = req.body;
    let id_pengguna = req.user._id; // Extracted from the token by the authenticate middleware
  
    try {
      // // Check if the product exists
      // const product = await Produk.findById(id_product);
      // if (!product) {
      //   return res.status(404).json({
      //     status: 404,
      //     message: "Product not found",
      //   });
      // }
  
      const newCart = new Cart({
        id_product,
        id_pengguna,
        jumlah_product_cart,
        total_pesanan,
      });
  
      await newCart.save();
  
      res.status(201).json({
        status: 201,
        message: "Cart created successfully",
        data: {
          id_product: newCart.id_product,
          id_pengguna: newCart.id_pengguna,
          jumlah_product_cart: newCart.jumlah_product_cart,
          total_pesanan: newCart.total_pesanan,
        },
      });
    } catch (error) {
      // Error handling code here
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  exports.updateCart = async (req, res) => {
    const { _id } = req.params;
    const { jumlah_product_cart, total_pesanan } = req.body;
  
    try {
      const cart = await Cart.findById(_id);
  
      if (!cart) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
  
      cart.jumlah_product_cart = jumlah_product_cart || cart.jumlah_product_cart;
      cart.total_pesanan = total_pesanan || cart.total_pesanan;
  
      await cart.save();
  
      res.status(200).json({
        status: 200,
        message: "Cart updated successfully",
        data: {
          id_product: cart.id_product,
          id_pengguna: cart.id_pengguna,
          jumlah_product_cart: cart.jumlah_product_cart,
          total_pesanan: cart.total_pesanan,
        },
      });
    } catch (error) {
      // Error handling code here
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  exports.deleteCart = async (req, res) => {
    const { _id } = req.params;
  
    try {
      const cart = await Cart.findById(_id);
  
      if (!cart) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
  
      await cart.deleteOne();
  
      res.status(200).json({
        status: 200,
        message: "Cart deleted successfully",
      });
    } catch (error) {
      // Error handling code here
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  exports.getAllCartById = async (req, res) => {
    const id_pengguna = req.user._id; // Extracted from the token by the authenticate middleware
  
    try {
      const carts = await Cart.find({ id_pengguna }).populate('id_product');
  
      if (!carts || carts.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No carts found for this user",
        });
      }
  
      res.status(200).json({
        status: 200,
        message: "Carts retrieved successfully",
        data: carts,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  };