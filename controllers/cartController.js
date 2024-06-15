const Cart = require("../models/cart.js");

// exports.createCart = async (req, res) => {
//     const { id_product, jumlah_product_cart, total_pesanan } = req.body;
//     let id_pengguna = req.user._id; // Extracted from the token by the authenticate middleware

//     try {
//       const newCart = new Cart({
//         id_product,
//         id_pengguna,
//         jumlah_product_cart,
//         total_pesanan,
//       });
//       await newCart.save();
//       res.status(201).json({
//         status: 201,
//         message: "Cart created successfully",
//         data: {
//           id_product: newCart.id_product,
//           id_pengguna: newCart.id_pengguna,
//           jumlah_product_cart: newCart.jumlah_product_cart,
//           total_pesanan: newCart.total_pesanan,
//         },
//       });
//     } catch (error) {
//       // Error handling code here
//       res.status(500).json({
//         status: 500,
//         message: "Internal server error",
//         error: error.message,
//       });
//     }
//   };

exports.createCart = async (req, res) => {
  const { products } = req.body;
  let id_pengguna = req.user._id;

  try {
    const newCart = new Cart({
      id_pengguna,
      products,
    });

    await newCart.save();

    res.status(201).json({
      status: 201,
      message: "Cart created successfully",
      data: {
        cart: newCart,
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

exports.updateCart = async (req, res) => {
  const { _id } = req.params;
  const { id_product, jumlah_product_cart } = req.body;

  try {
    const cart = await Cart.findOne({ _id: id_cart });

    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found",
      });
    }

    // Update specific product in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.id_product.toString() === id_product
    );

    if (productIndex !== -1) {
      // If the product exists, update it
      cart.products[productIndex].jumlah_product_cart = jumlah_product_cart;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push({ id_product, jumlah_product_cart });
    }

    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Cart updated successfully",
      data: cart,
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

exports.deleteCart = async (req, res) => {
  let id_pengguna = req.user._id;

  try {
    const cart = await Cart.deleteMany({ id_pengguna });

    if (cart.deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found or already deleted",
      });
    }

    res.status(200).json({
      status: 200,
      message: `${cart.deletedCount} cart(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  const { _id } = req.params; // _id should be the cart's ID
  const { id_product } = req.body; // id_product should be in the request body

  try {
    const cart = await Cart.findOne({ _id });

    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found",
      });
    }

    // Find the index of the product in the cart's products array
    const productIndex = cart.products.findIndex(
      (product) => product.id_product.toString() === id_product
    );

    if (productIndex !== -1) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
    } else {
      return res.status(404).json({
        status: 404,
        message: "Product not found in the cart",
      });
    }

    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//   exports.getAllCartById = async (req, res) => {
//     const id_pengguna = req.user._id; // Extracted from the token by the authenticate middleware

//     try {
//         const carts = await Cart.find({ id_pengguna }).populate('id_product');

//         if (!carts || carts.length === 0) {
//             return res.status(404).json({
//                 status: 404,
//                 message: "No carts found for this user"
//             });
//         }

//         res.status(200).json({
//             status: 200,
//             message: "Carts retrieved successfully",
//             data: carts
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 500,
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };

exports.getAllCart = async (req, res) => {
  let id_pengguna = req.user._id;
  try {
    const carts = await Cart.find({ id_pengguna: id_pengguna }).select(
      "_id id_pengguna products"
    );

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
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateStatusCart = async (req, res) => {
  const { _id } = req.params;
  const { id_product, isActive } = req.body;

  try {
    const cart = await Cart.findOne({ _id });

    if (!cart) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found",
      });
    }
    // Find the product in the cart's products array
    const productIndex = cart.products.findIndex(
      (product) => product.id_product.toString() === id_product
    );

    if (productIndex !== -1) {
      // Update the isActive status of the found product
      cart.products[productIndex].isActive = isActive;

      await cart.save();

      // Respond with a success message and the updated cart data
      return res.status(200).json({
        status: 200,
        message: "Product status updated successfully",
        data: cart,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Product not found in the cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
