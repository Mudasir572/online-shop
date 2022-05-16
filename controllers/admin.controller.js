const Product = require('../models/product.model');

async function getAllProducts(req,res,next){
    let products;
    try{
     products = await Product.findAll();
    }catch(error){
    return  next(error);
    
    }
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
            
            try{
                await product.save();

            }catch(error){
                return next(error);
            }

          res.redirect('/admin/products')
    }

async function getUpdateProduct(req,res){
const product = await Product.findById(req.params.id);

res.render("admin/update-product",{product: product});
}

async function updateProduct(req,res){
    const product = new Product({
        ...req.body,
      _id: req.params.id});
      if(req.file){
          product.replaceImage(req.file.filename)
      }
      try{
          await product.save();
    }catch(error){
       return next(error);
    }

          

    res.redirect('/admin/products')
}

async function deleteProduct(req,res){
  let product;
  try{
   
 product = await Product.findById(req.params.id);
await product.delete();
}catch(error){
   return next(error)
}
    
   res.json({message: "Deleted Product!"});
}
    module.exports = {
        getAllProducts: getAllProducts,
        getAllOrders: getAllOrders,
        getAddProduct: getAddProduct,
        addProduct: addProduct,
        getUpdateProduct: getUpdateProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct,
    }