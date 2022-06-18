const Coupon = require('../models/coupon.model');

async function deleteExpiredCouponFromSession(req,res,next){

    const coupons = await Coupon.findAll();

if(req.session.coupon){
    const sessionCoupon = req.session.coupon;

    const existingCoupon  = coupons.find(function(couponItem){
    return couponItem.id === sessionCoupon.id 
    })

    if(!existingCoupon){
        req.session.coupon = null;
        
        res.redirect('/')
        return
    }
}
next()

}

module.exports = deleteExpiredCouponFromSession;