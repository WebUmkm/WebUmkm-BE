import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Menu = db.define('menu', {
    nama_menu: {
        type: DataTypes.STRING
    },
    jenis_menu: {
        type: DataTypes.STRING
    },
    stock_menu: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    img_menu: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
})

export default Menu;