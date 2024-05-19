const dbPool = require("../config/database");

const getAllMenu = () => {
  const SQLQuery = "SELECT * FROM menu";
  return dbPool.execute(SQLQuery);
};
const createMenu = (body) => {
  const { nama_menu, jenis_menu, stock_menu, description, img_menu } = body;
  const SQLQuery = `INSERT INTO menu (nama_menu, jenis_menu, stock_menu, description, img_menu) VALUES ('${nama_menu}', '${jenis_menu}', '${stock_menu}', '${description}', '${img_menu}')`;
  return dbPool.execute(SQLQuery);
};

const getMenuByName = (nama_menu) => {
  const SQLQuery = `SELECT * FROM menu WHERE nama_menu = '${nama_menu}'`;
  return dbPool.execute(SQLQuery);
};

const updateStockMenu = (id, stock_menu) => {
  const SQLQuery = `UPDATE menu SET stock_menu = '${stock_menu}' WHERE id = '${id}'`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllMenu,
  createMenu,
  getMenuByName,
  updateStockMenu,
};
