import Order from "../model/OrderModel";

export const getAllOrder = async (req, res) => {
    try {
        const order = await Order.findAll({
            attributes: ["id", "order", "fullname", "jumlah_pesanan", "harga_pesanan", "deskripsi_pesanan"],
        });
        res.json(order);
    } catch (error) {
        console.error(error.message);
    }
}

export const createOrder = async (req, res) => {
    const { order, fullname, jumlah_pesanan, harga_pesanan, deskripsi_pesanan } = req.body;
    if (!order || !fullname || !jumlah_pesanan || !harga_pesanan || !deskripsi_pesanan) {
        return res.status(400).json({ message: "All field must be filled" });
    }
    try {
        await Order.create({
            order: order,
            fullname: fullname,
            jumlah_pesanan: jumlah_pesanan,
            harga_pesanan: harga_pesanan,
            deskripsi_pesanan: deskripsi_pesanan,
        });
        res.json({ message: "Order created" });
    } catch (error) {
        console.log(error);
    }
}