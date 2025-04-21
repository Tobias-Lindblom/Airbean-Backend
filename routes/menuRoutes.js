const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const validateMenuInput = require('../middleware/validateMenuInput');
// const verifyToken = require('../middleware/verifyToken'); // ⛔️ Tillfälligt bortkommenterad

router.get('/', menuController.getMenu);
router.post('/', validateMenuInput, menuController.addProduct);

module.exports = router;