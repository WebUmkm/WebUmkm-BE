const express = require('express');
const router = express.Router();
const menuController = require('../controller/MenuController');


router.get('/', menuController.GetAllMenu);
router.post('/', menuController.createMenu);
router.get('/:name', menuController.getByNameMenu);

module.exports = router;