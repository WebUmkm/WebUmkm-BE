const express = require('express');
const router = express.Router();
const { createProduct, getAllProduct, getProductByKategori, getProductById } = require('../controllers/productController.js');
const { storage, imageFilter, upload } = require('../middleware/image.js');


router.post('/', upload.single('gambar'), createProduct);
router.get('/', getAllProduct);
router.get('/:kategori', getProductByKategori);
router.get('/:id', getProductById);

module.exports = router;