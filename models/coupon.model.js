const db = require("../data/database");
const mongodb = require('mongodb');

class Coupon {
  constructor(code, type, discount, expiry,couponId) {
    this.code = code;
    this.type = type;
    this.discount = discount, 
    this.expiry = new Date(expiry);
    this.currentDate = new Date();
    if(couponId){
      this.id = couponId.toString();
    }
  }

  save() {
    const coupon = {
      code: this.code,
      type: this.type,
      discount: +this.discount,
      expiry: this.expiry,
     
    };

    db.getDb().collection("coupons").insertOne(coupon);
  }

  static async findByCode(enteredCode) {
    const coupon = await db
      .getDb()
      .collection("coupons")
      .findOne({ code: enteredCode });

      if(!coupon){
        const error = new Error("No such coupon exists.");
      error.code = 404;
      throw error;
      
      }
    return new Coupon(
      coupon.code,
      coupon.type,
      coupon.discount,
      coupon.expiry,
      coupon._id
    );
  }

  static async findAll(){
    const coupons = await db.getDb().collection('coupons').find().toArray();
     return coupons.map(function(coupon){
return new Coupon(coupon.code,coupon.type,coupon.discount,coupon.expiry,coupon._id);
     })

  }
  async delete(){
const couponId = new mongodb.ObjectId(this.id);
    await db.getDb().collection('coupons').deleteOne({_id: couponId})
  }
}

module.exports = Coupon;
