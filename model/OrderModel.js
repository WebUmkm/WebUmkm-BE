import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Order = db.define('order', {
    order: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.STRING
    },
    jumlah_pesanan: {
        type: DataTypes.INTEGER
    },
    harga_pesanan: {
        type: DataTypes.STRING
    },
    deskripsi_pesanan: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
})

export default Order;