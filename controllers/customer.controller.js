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
    let cart = res.locals.cart;
    
    let coupon;
    try{
        coupon = await Coupon.findByCode(req.body.code); 
    }catch(error){
        return next(error);
    }
    req.session.coupon = coupon;

    const discount = (cart.totalPrice/100) * coupon.discount;
    cart.totalPrice = cart.totalPrice - discount;
    req.session.cart = cart;

    res.json({
        massage: "coupon added",
        discount: discount,
        totalPrice: cart.totalPrice,

    })

}
module.exports = {
    getShop: getShop,
    getProductDetails: getProductDetails,
    applyCoupon: applyCoupon,
} 