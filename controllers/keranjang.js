import Keranjang from "../model/keranjangModel.js";
import Menu from "../model/MenuModel.js";

export const createCart = async (req, res) => {
    const { nama_menu, fullname, harga_pesanan, jumlah_pesanan } = req.body;
    if (!nama_menu || !fullname || !harga_pesanan || !jumlah_pesanan) {
        return res.status(400).json({ message: "All field must be filled" });
    }
    try {
        await Keranjang.create({
            nama_menu: nama_menu,
            fullname: fullname,
            harga_pesanan: harga_pesanan,
            jumlah_pesanan: jumlah_pesanan,
        });
        res.status(201).json({ message: "Cart created" });
    } catch (error) {
        console.error(error.message);
    }
};

// export const createCart = async (req, res) => {
//     try {
//       const { userId, menuId, quantity } = req.body;
  
//       // Check if menu exists
//       const menu = await Menu.findById(menuId);
//       if (!menu) {
//         return res.status(404).json({
//           message: 'Menu not found',
//         });
//       }
  
//       // Check if cart exists for user
//       const cart = await Keranjang.findOne({
//         user: userId,
//       });
  
//       if (cart) {
//         // Check if menu is already in cart
//         const menuIndex = cart.menu.findIndex((m) => m.menu.toString() === menuId);
//         if (menuIndex !== -1) {
//           // Menu is already in cart, update quantity
//           cart.menu[menuIndex].quantity += quantity;
//         } else {
//           // Menu is not in cart, add new menu item
//           cart.menu.push({
//             menu: menuId,
//             quantity,
//           });
//         }
  
//         // Save updated cart
//         const updatedCart = await cart.save();
  
//         res.status(200).json(updatedCart);
//       } else {
//         // Create new cart for user
//         const newCart = new Keranjang({
//           user: userId,
//           menu: [{ menu: menuId, quantity }],
//         });
  
//         // Save new cart
//         const savedCart = await newCart.save();
  
//         res.status(201).json(savedCart);
//       }
//     } catch (error) {
//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

export const getidMenu = async (req, res) => {
  try {
    const dataMenu = await Menu.findAll({
      where: {
        id : req.params.id,
      },
    attributes: {
      nama_menu: ["nama_menu", "harga_menu"]
    }
    });
    res.json(dataMenu);
  } catch (error) {
    console.log(error);
  }
}

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { nama_menu, fullname, harga_pesanan, jumlah_pesanan } = req.body;
  const cart = req.Keranjang.role;
  if (cart !== "user"){
    return res.status(403).json({
      message: "access denied"
    })
  }
  try {
    const cartData = await Keranjang.findAll({
      where: {
        id : id
      },
      attribute: [
        "nama_menu",
        "fullname",
        "harga_pesanan",
        "jumlah_pesanan"
      ]
    })
    
  } catch (error) {
    
  }
}