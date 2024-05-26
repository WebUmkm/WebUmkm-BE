import { Sequelize } from "sequelize";

const db = new Sequelize('umkm', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export default db;