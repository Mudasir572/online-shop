const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const db = require("../data/database");

class User {
  constructor(email, password, username, city, postalcode, street) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.address = {
      city: city,
      postalcode: postalcode,
      street: street,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      username: this.username,
      address: this.address,
    });
  }
  async signupAsAdmin() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      username: this.username,
      address: this.address,
      isAdmin: true,
    });
  }

   getUserWithSameEmail(){
     return db.getDb().collection("users").findOne({email: this.email})
  }

  static  findById(userId){
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, {projection: {password: 0 }});
  }

  static async findAll(){
   const users = await db.getDb().collection("users").find().toArray();
   return users;
  }



}

module.exports = User;
