import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { createOrder } from '../controllers/Order.js';

const routerOrder = express.Router();

routerOrder.post('/', createOrder);

export default routerOrder;