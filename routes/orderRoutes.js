const express = require('express');
const { createOrder, getOrderStatus } = require('../controllers/orderController');
const validateOrderItems = require('../middleware/validateOrderItems'); 
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.post('/', validateOrderItems, verifyToken, createOrder);

router.get('/:orderNumber', getOrderStatus);

module.exports = router;