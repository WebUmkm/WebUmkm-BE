import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { createMenu, getAllMenu, getAllMenuMakanan, updateMenu } from '../controllers/Menu.js';

const routerMenu = express.Router();

routerMenu.get('/',  verifyToken, getAllMenu);
routerMenu.get('/:jenis_menu',verifyToken, getAllMenuMakanan);
routerMenu.post('/', verifyToken,  createMenu);
routerMenu.put('/:id',  updateMenu);

export default routerMenu;