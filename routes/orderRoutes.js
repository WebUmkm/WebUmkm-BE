const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/orderController.js');
const verifyToken = require('../middleware/auth.js');


router.post('/:userId/:paymentMethodId', verifyToken, createOrder);



module.exports = router;