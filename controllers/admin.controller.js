const Product = require('../models/product.model');

async function getAllProducts(req,res){
    const products = await Product.findAll();
    res.render("admin/products",{products: products});
}

function getAllOrders(req,res){
    res.render('admin/orders');
}

function getAddProduct(req,res){
    res.render('admin/new-product');
    }

  async function addProduct(req,res){
     
          const product = new Product({
              ...req.body,
            image: req.file.filename});
          await product.save();

          res.redirect('/admin/products')
    }


    module.exports = {
        getAllProducts: getAllProducts,
        getAllOrders: getAllOrders,
        getAddProduct: getAddProduct,
        addProduct: addProduct
    }