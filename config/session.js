const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);

const DB = process.env.DATABASE;
function createSessionStore(){
    const store = new MongoDbStore({
        uri: DB,
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