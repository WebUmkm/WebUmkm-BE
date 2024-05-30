import express from 'express';
import db from './config/database.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import Users from './model/UsersModel.js';
import Menu from './model/MenuModel.js';
import Order from './model/OrderModel.js';
import Keranjang from './model/keranjangModel.js';
import cors from 'cors';
import router from './routes/index.js';
import routerMenu from './routes/menuRoutes.js';
import routerOrder from './routes/orderRoutes.js';
import routerCart from './routes/keranjang.js';
dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database connected....');
} catch (error) {
    console.error('Error: ' + error);
}


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(routerMenu);
app.use(routerOrder);
app.use(routerCart);

app.listen(5000, ()=> console.log('server running at port 5000'));