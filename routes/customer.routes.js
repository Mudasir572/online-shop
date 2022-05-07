const express = require("express");

const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.get('/',customerController.getShop)
router.get('/cart',function(req,res){
    res.render('customer/cart')
});

router.get('/orders',function(req,res){
    res.render('customer/orders')
});

router.get('/products/:id',customerController.getProductDetails);
module.exports = router;

