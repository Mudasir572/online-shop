const Product = require("../models/product.model")

async function getShop(req,res){
const products = await Product.findAll();
    res.render('customer/shop',{products: products});
}

async function getProductDetails(req,res){
    const product = await Product.findById(req.params.id);

    res.render("customer/product-details",{product: product})
}
module.exports = {
    getShop: getShop,
    getProductDetails: getProductDetails,
} 