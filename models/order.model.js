const db = require("../data/database");
const mongodb = require("mongodb");

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.orderData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formatedDate = this.date.toLocaleDateString("en-Us", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  static async findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);
    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    return orders.map(function (orderDoc) {
      return new Order(
        orderDoc.orderData,
        orderDoc.userData,
        orderDoc.status,
        orderDoc.date,
        orderDoc._id
      );
    });
  }

  static async findAllOrders() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();

      return orders.map(function (orderDoc) {
        return new Order(
          orderDoc.orderData,
          orderDoc.userData,
          orderDoc.status,
          orderDoc.date,
          orderDoc._id
        );
      });
  }

  static async findById(oid) {
    const orderId = new mongodb.ObjectId(oid);
    const orderDoc = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: orderId });

    return new Order(
      orderDoc.orderData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  save() {
    if (this.id) {
      const orderId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } });
    } else {
      const orderDocument = {
        userData: this.userData,
        orderData: this.orderData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection("orders").insertOne(orderDocument);
    }
  }
}

module.exports = Order;
