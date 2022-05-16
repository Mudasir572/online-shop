const Product = require('../models/product.model')
// const Cart = require("../models/cart.model");

async function addToCart(req,res,next){
    let product;
    try{
         product = await Product.findById(req.body.productId);
   }catch(error){
       next(error);
       return;
   }
     const cart = res.locals.cart;

       cart.addItem(product);

       req.session.cart = cart;
res.status(201).json({
    massege: 'Cart Updated!',
    newTotalItems: cart.totalQuantity,
})



}

module.exports = {
    addToCart: addToCart
}