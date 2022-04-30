const db = require('../data/database')

class Product {
    constructor(productData){
       this.title = productData.title;
       this.summary = productData.summary;
       this.price = productData.price;
       this.discription = productData.discription;
       this.image  = productData.image;
       this.imagePath = `product-data/images/${this.image}`;
       this.imageUrl = `/products/assets/images/${this.image}`
     if(productData._id){
          this.id = productData._id.toString();
      }
    }

    async save(){
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            discription: this.discription,
            image: this.image,
        }


      await db.getDb().collection('products').insertOne(productData);
    }

     static async findAll(){
     const products = await db.getDb().collection('products').find().toArray();
     
     return products.map(function(productDocument){
       return new Product(productDocument);
     })
     
    }
}


module.exports = Product;