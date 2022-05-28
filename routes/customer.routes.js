const express = require("express");

const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.get('/products',customerController.getShop)




router.get('/products/:id',customerController.getProductDetails);
module.exports = router;

