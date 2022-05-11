const db = require("../data/database");
const mongodb = require("mongodb");
class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.discription = productData.discription;
    this.image = productData.image;
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      discription: this.discription,
      image: this.image,
    };

    if(this.id){
      const productId = new mongodb.ObjectId(this.id);
       if(!this.image){
         delete productData.image;
       }
      await db.getDb().collection("products").updateOne({_id: productId},{$set: productData})
    }else{
    await db.getDb().collection("products").insertOne(productData);
  }}

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
  static async findById(productId){
    const prodId =  new mongodb.ObjectId(productId);
    const productDocument = await db.getDb().collection('products').findOne({_id: prodId})

    return new Product(productDocument);
  }

 delete(){

const prodId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({_id: prodId});
  }
}

module.exports = Product;
