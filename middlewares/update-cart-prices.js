async function updateCartPrices(req,res,next){
const cart = res.locals.cart;

  await cart.updatePrices();
if(req.session.coupon){
res.locals.coupon = req.session.coupon
  
}
 

 let discount;
  if(req.session.coupon && req.session.coupon.type === 'persentage'){
     discount = (cart.totalPrice/100) * req.session.coupon.discount;
    
    cart.totalPrice = cart.totalPrice - discount;
         
  }else if(req.session.coupon && req.session.coupon.type === 'amount'){
    discount = req.session.coupon.discount;
     
    cart.totalPrice = cart.totalPrice - discount;
      
  }

   
 if(cart.items.length === 0){
   req.session.coupon = null;
   res.locals.coupon = null;
  cart.totalPrice = 0;
   }

    req.session.cart = cart;

  next()
}

module.exports = updateCartPrices;