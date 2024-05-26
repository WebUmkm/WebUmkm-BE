import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { createMenu, getAllMenu, getAllMenuMakanan } from '../controllers/Menu.js';

const routerMenu = express.Router();

routerMenu.get('/', getAllMenu);
routerMenu.get('/:jenis_menu', getAllMenuMakanan);
routerMenu.post('/', createMenu);

export default routerMenu;