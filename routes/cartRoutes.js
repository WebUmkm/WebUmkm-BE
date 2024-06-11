const express = require('express');
const router = express.Router();
const { createCart, getAllCartById, updateCart, deleteCart } = require('../controllers/cartController.js');
const verifyToken = require('../middleware/auth.js');


router.post('/',verifyToken, createCart);
router.get('/',verifyToken, getAllCartById);
router.put('/update/:_id',verifyToken, updateCart);
router.delete('/:_id',verifyToken, deleteCart);


module.exports = router;