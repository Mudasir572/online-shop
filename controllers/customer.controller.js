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
module.exports = {
    getShop: getShop,
    getProductDetails: getProductDetails,
} 