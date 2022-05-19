const express = require("express");
const cartController = require("../controllers/cart.controller");


const router = express.Router();

router.get('/cart',async function(req,res){
   await res.render("customer/cart")
});

router.post('/cart',cartController.addToCart);

router.patch('/cart/items', cartController.updateCart);


module.exports = router;