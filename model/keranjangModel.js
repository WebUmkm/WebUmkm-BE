import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Keranjang = db.define('Keranjang',{
    nama_menu: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.STRING
    },
    harga_pesanan: {
        type: DataTypes.STRING
    },
    jumlah_pesanan: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
})

export default Keranjang;