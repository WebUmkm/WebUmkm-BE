import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Keranjang = db.define('Keranjang',{
    id_keranjang: {
        type: DataTypes.INTEGER
    },
    id_menu: {
        type: DataTypes.INTEGER
    },
    id_user: {
        type: DataTypes.INTEGER
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

export default Keranjang;