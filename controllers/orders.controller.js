
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req,res,next){
    try{
        const orders = await Order.findAllForUser(res.locals.uid);
        res.render('customer/orders',{orders: orders})
       
    }catch(error){
        next(error);
        return;
    }

}

async function addOrder(req,res,next){
const cart = res.locals.cart;

let userDocument; 
try{
userDocument = await User.findById(res.locals.uid);
}catch(error){
next(error)
return;
}

const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function(item){
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.title,
                },
                unit_amount: +item.product.price.toFixed(2) * 100,
            },
            quantity: item.quantity,
        }
    }),
    
    
    mode: 'payment',
    success_url: "http://localhost:3000/orders/success",
    cancel_url: "http://localhost:3000/orders/failure",
  });

  
const order = new Order(cart,userDocument);

try{
    await order.save();

}catch(error){
    next(error);
    return;
}



  req.session.cart = null;

  res.redirect(303, session.url);
  
  


} 


function getSuccess(req,res){
    res.render('customer/order-success');
}
function getFailure(req,res){
    res.render('customer/order-failed');
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
    getSuccess: getSuccess,
    getFailure: getFailure,
}