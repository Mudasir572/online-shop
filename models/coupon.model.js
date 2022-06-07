const db = require("../data/database");

class Coupon {
  constructor(code, type, discount, expiry) {
    this.code = code;
    this.type = type;
    (this.discount = discount), (this.expiry = new Date(expiry));
    this.currentDate = new Date();
  }

  save() {
    const coupon = {
      code: this.code,
      type: this.type,
      discount: +this.discount,
      expiryDate: this.expiry,
      currentDate: this.currentDate,
    };

    db.getDb().collection("coupons").insertOne(coupon);
  }

  static async findByCode(enteredCode) {
    const coupon = await db
      .getDb()
      .collection("coupons")
      .findOne({ code: enteredCode });
    return new Coupon(
      coupon.code,
      coupon.type,
      coupon.discount,
      coupon.expiryDate
    );
  }
}

module.exports = Coupon;
