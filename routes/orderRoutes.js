const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUserId, GetCountOrderByIdPengguna } = require('../controllers/orderController.js');
const verifyToken = require('../middleware/auth.js');


router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrdersByUserId);
router.get('/count/:id_pengguna', verifyToken, GetCountOrderByIdPengguna);



module.exports = router;