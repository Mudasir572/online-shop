const express = require("express");

const router = express.Router();

const customerController = require('../controllers/customer.controller');

router.get('/',customerController.getShop)
router.get('/cart',function(req,res){
    res.render('customer/cart')
});
module.exports = router;

