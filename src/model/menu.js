const dbPool = require('../config/database');

const getAllMenu = () => {
 const SQLQuery = "SELECT * FROM menu";
 return dbPool.execute(SQLQuery);   
}
const createMenu = (body) => {
    const { name, price, description } = body;
    const SQLQuery = `INSERT INTO menu (name, price, description) VALUES ('${name}', ${price}, '${description}')`;
    return dbPool.execute(SQLQuery);
}

const getMenuByName = (id) => {
    const SQLQuery = `SELECT * FROM menu WHERE id = ${id}`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllMenu,
    createMenu,
    getMenuByName
}