const express = require('express');
const router = express.Router();
const { createProduct, getAllProduct, getProductByKategori, getProductById } = require('../controllers/productController.js');
const { storage, imageFilter, upload } = require('../middleware/image.js');


router.post('/', upload.single('img_menu'), createProduct);
router.get('/', getAllProduct);
router.get('/:jenis_menu', getProductByKategori);
router.get('/:id', getProductById);

module.exports = router;