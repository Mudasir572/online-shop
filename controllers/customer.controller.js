const Coupon = require("../models/coupon.model");
const Product = require("../models/product.model")

async function getShop(req,res,next){
let products;
try{
     products = await Product.findAll();

}catch(error){
    next(error)
   return;
}


    res.render('customer/shop',{products: products});
}

async function getProductDetails(req,res,next){
    let product;
    try{

         product = await Product.findById(req.params.id);
    }catch(error){
         next(error)
         return
    }

    res.render("customer/product-details",{product: product})
}

async function applyCoupon(req,res,next){
    const cart = res.locals.cart;
    
    let coupon;
    try{
        coupon = await Coupon.findByCode(req.body.code); 
    }catch(error){
        next(error);
        return; 
    }
    
    if(req.session.coupon){
        return

}
    
    
      let discount;
    if(coupon.type === 'persentage'){
        discount = (cart.totalPrice/100) * coupon.discount;
    
        cart.totalPrice = cart.totalPrice - discount;
    }else if(coupon.type === 'amount'){
        discount = coupon.discount;
        cart.totalPrice = cart.totalPrice - discount;
    }

    req.session.cart = cart;
    req.session.coupon = coupon;
    res.locals.coupon = req.session.coupon;
   
     res.json({
        totalPrice: cart.totalPrice,
        discount: discount,
        coupon: coupon,

    })

}
module.exports = {
    getShop: getShop,
    getProductDetails: getProductDetails,
    applyCoupon: applyCoupon,
} 