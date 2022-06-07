const express = require("express");

const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.get('/products',customerController.getShop)




router.get('/products/:id',customerController.getProductDetails);

router.post('/coupon',customerController.applyCoupon);
module.exports = router;

