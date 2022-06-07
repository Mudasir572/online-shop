async function updateCartPrices(req,res,next){
const cart = res.locals.cart;

  await cart.updatePrices();
 if(cart.items.length === 0){
cart.totalPrice = 0;
req.session.coupon = null;
 }

  if(req.session.coupon){
    const discount = (cart.totalPrice/100) * req.session.coupon.discount;
    cart.totalPrice = cart.totalPrice - discount;
    req.session.cart = cart;       
  }

  next()
}

module.exports = updateCartPrices;