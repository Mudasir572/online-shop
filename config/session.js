const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

function createSessionStore(){
    const store = new MongoDbStore({
        uri: "mongodb+srv://Mudasir:dataissecure@cluster0.lf51kpk.mongodb.net/?retryWrites=true&w=majority",
        databaseName: 'my-shop',
        collection: "sessions",
    })
    return store;
};

function createSessionConfig(){
    return {
        secret: "thisissecret",
        resave: false,
        saveUninitialized: true,
        store: createSessionStore(),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 3
        }
    }
}

module.exports = createSessionConfig;