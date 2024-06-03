import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { createCart } from '../controllers/keranjang.js';

const routerCart = express.Router();

routerCart.post('/cart/', verifyToken, createCart);

export default routerCart;
