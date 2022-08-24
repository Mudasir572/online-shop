
const mongodb = require('mongodb');
const ServerApiVersion = mongodb.ServerApiVersion;
const MongoClient = mongodb.MongoClient;
// const { MongoClient, ServerApiVersion } = require('mongodb');

let database;

async function connectToDatabase(){
    const client = await MongoClient.connect("mongodb+srv://Mudasir:dataissecure@cluster0.lf51kpk.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // const client = await MongoClient.connect("mongodb+srv://Mudasir:dataissecure@cluster0.lf51kpk.mongodb.net/?retryWrites=true&w=majority");
    // const client = await MongoClient.connect("mongodb+srv://mudasir-ahmed:dataissecure@cluster0.i7tr4.mongodb.net/test");
    database = client.db('my-shop');

    // const { MongoClient, ServerApiVersion } = require('mongodb');
    // const uri = "mongodb+srv://Mudasir:my-shop-cluster@cluster0.i7tr4.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//    database = client.connect(err => {
//       const collection = client.db("myshop");
//     //   perform actions on the collection object
//       client.close();
//    });
    

}

function getDb(){
    if(!database){
        
        throw new Error("You must connect first!");
    };
    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}