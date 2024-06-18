const express = require('express');
const router = express.Router();
const { createAlamatPengiriman, getAllAlamatPengiriman } = require('../controllers/alamatController.js');
const verifyToken = require('../middleware/auth.js');


router.post('/', verifyToken, createAlamatPengiriman);
router.get('/alamat', verifyToken, getAllAlamatPengiriman);

module.exports = router;