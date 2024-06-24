const Order = require("../models/pesanan.js");
const Cart = require("../models/cart.js"); 
const MetodePembayaran = require("../models/metode_pembayaran.js"); 
const AlamatPengiriman = require("../models/alamat_pengiriman.js");
const Produk = require("../models/product.js");
const Pembayaran = require("../models/pembayaran.js");

exports.createOrder = async (req, res) => {
  try {
    let id_pengguna = req.user._id;
    const {
      id_MetodePembayaran,
      id_alamat_pengiriman,
      detail_pesanan,
      total_harga, // Directly use total_harga from req.body
      metode_pengambilan
    } = req.body;

    // Find the active cart for the user
    const cart = await Cart.findOne({
      id_pengguna: id_pengguna,
      "products.isActive": true,
    });
    if (!cart) {
      return res.status(404).json({ message: "Active cart not found" });
    }

    // Validate the payment method ID
    const paymentMethod = await MetodePembayaran.findById(id_MetodePembayaran);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Validate the shipping address ID
    const shippingAddress = await AlamatPengiriman.findById(id_alamat_pengiriman);
    if (!shippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    // Create the payment record
    const payment = new Pembayaran({
      metode_pembayaran: paymentMethod.nama_metode, // Assuming the payment method has a `nama_metode` field
      status_pembayaran: "Pending", // Initial status for payment
      id_pengguna: id_pengguna,
    });
    await payment.save();

    // Prepare order details
    const orderDetails = detail_pesanan.map(item => ({
      id_product: item.id_product,
      Jumlah: item.jumlah,
      total_harga: item.total_harga // Assumes detail_pesanan in req.body includes total_harga for each item
    }));

    // Create a new Order document
    const newOrder = new Order({
      id_MetodePembayaran,
      id_alamat_pengiriman,
      id_pembayaran: payment._id, // Reference the created payment record
      id_pengguna: id_pengguna,
      metode_pengambilan,
      detail_pesanan: orderDetails,
      total_harga: total_harga, // Use the total_harga from req.body
      tanggal_pesanan: new Date(),
      status_pesanan: "Pending",
      isActive: true,
    });

    // Save the new order to the database
    await newOrder.save();

    // Reduce the stock quantity for each product
    await Promise.all(detail_pesanan.map(async (item) => {
      const product = await Produk.findById(item.id_product);
      if (!product) {
        throw new Error(`Product with ID ${item.id_product} not found`);
      }
      if (product.stock_menu < item.jumlah) {
        throw new Error(`Insufficient stock for product with ID ${item.id_product}`);
      }
      product.stock_menu -= item.jumlah;
      await product.save();
    }));

    // Mark the cart products as inactive and update status_final
    cart.products.forEach((product) => {
      if (product.isActive) {
        product.isActive = false;
        product.status_final = true; // Add status_final field and set it to true
      }
    });

    // Save the updated cart
    await cart.save();
    
    res.status(201).json({
      status: 201,
      message: "Order created successfully",
      data: {
        id_MetodePembayaran: newOrder.id_MetodePembayaran,
        id_alamat_pengiriman: newOrder.id_alamat_pengiriman,
        id_pembayaran: newOrder.id_pembayaran,
        metode_pengambilan: newOrder.metode_pengambilan,
        id_pengguna: newOrder.id_pengguna,
        detail_pesanan: newOrder.detail_pesanan,
        total_harga: newOrder.total_harga,
        tanggal_pesanan: newOrder.tanggal_pesanan,
        status_pesanan: newOrder.status_pesanan,
        isActive: newOrder.isActive,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getOrdersByUserId = async (req, res) => {
    try {
      let id_pengguna = req.user._id;
  
      // Find all orders for the given user ID
      const orders = await Order.find({ id_pengguna });
  
      // If no orders found, return a 404 status
      if (!orders || orders.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No orders found for the user",
        });
      }
  
      // Respond with the found orders
      res.status(200).json({
        status: 200,
        message: "Orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

exports.GetCountOrderByIdPengguna = async (req, res) => {
  const { id_pengguna } = req.params;
  try {
    const countOrder = await Order.countDocuments({ id_pengguna });

    res.status(200).json({
      message: "Order count retrieved successfully",
      data: {
        id_pengguna,
        countOrder
      },
    });
  } catch (error) {
    console.error("Error retrieving order count:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}