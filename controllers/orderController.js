const Order = require('../models/pesanan.js');
const Cart = require('../models/cart.js'); // Import the Cart model
const MetodePembayaran = require('../models/metode_pembayaran.js'); // Import the MetodePembayaran model

exports.createOrder = async (req, res) => {
    try {
        const { userId, paymentMethodId } = req.params; // Get userId and paymentMethodId from request parameters
        const { products } = req.body; // Get products from request body

        // Find the active cart for the user
        const cart = await Cart.findOne({ id_pengguna: (userId), 'products.isActive': 'true' });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found or no active products in the cart' });
        }

        // Validate the payment method ID
        const paymentMethod = await MetodePembayaran.findById(paymentMethodId);

        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }

        // Create a new Order document
        const newOrder = new Order({
            id_cart: cart._id,
            id_MetodePembayaran: paymentMethod._id,
            tanggal_pesanan: new Date(), // Set the order date to the current date
            status_pesanan: 'Pending', // Set the initial order status
            isActive: 'true' // Set the order as active
        });
        // Respond with the created Order
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'An error occurred while creating the order', error: error.message });
    }
}

exports.deleterOrder = async (req, res) => {

}

exports.getAllOrder = async (req, res) => {

}