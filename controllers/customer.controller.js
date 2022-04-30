const Product = require("../models/product.model")

async function getShop(req,res){
const products = await Product.findAll();
    res.render('customer/shop',{products: products});
}
module.exports = {
    getShop: getShop,
} 