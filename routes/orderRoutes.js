import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { createOrder } from '../controllers/Order.js';
import { getidMenu } from '../controllers/keranjang.js';

const routerOrder = express.Router();

routerOrder.post('/', createOrder);
routerOrder.get('/id', getidMenu);

export default routerOrder;