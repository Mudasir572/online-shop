const Coupon = require('../models/coupon.model');


async function deleteExpiredCoupon(){
    
    const coupons = await Coupon.findAll();
 
    const currentTime = new Date().getTime();
    
for(const coupon of coupons){
    const expiryTime = new Date(coupon.expiry).getTime();
  
    if(currentTime  >= expiryTime + 1000 * 60 * 60 * 24){
      await coupon.delete();
      
    }
}


};




module.exports = deleteExpiredCoupon;