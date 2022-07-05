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



  
const order = new Order(cart,userDocument);

try{
    await order.save();

}catch(error){
    next(error);
    return;
}



  req.session.cart = null;

  res.redirect('/orders/success');
  
  


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