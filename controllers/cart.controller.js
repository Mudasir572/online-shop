const Product = require("../models/product.model");
// const Cart = require("../models/cart.model");

async function addToCart(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;

  cart.addItem(product);

  req.session.cart = cart;
  res.status(201).json({
    massege: "Cart Updated!",
    newTotalItems: cart.totalQuantity,
  });
}

function updateCart(req, res) {
  const cart = res.locals.cart;

//   if(req.session.coupon){
// // console.log("coupon added")
// // location.reload()
//     return
//   }
  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );

  req.session.cart = cart;
  let couponApplied = false;
  if(res.locals.coupon){
    couponApplied = true;
  }

  res.json({
    massage: "cart item Updated!",  
    couponApplied: couponApplied,
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}
module.exports = {
  addToCart: addToCart,
  updateCart: updateCart,
};
