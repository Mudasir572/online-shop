const expressSession = require("express-session");
const csrf = require('csurf');
const createSessionConfig = require("./config/session");

const path = require('path');
const express = require('express');
const db = require('./data/database')

const app = express();


const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const checkAuthStatusMiddleware = require("./middlewares/check-auth")
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'));
app.use("/products/assets",express.static('product-data'));
app.use(express.urlencoded({extended: false}))

app.use(expressSession(createSessionConfig()));

app.use(csrf());


app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);


app.use(authRoutes);
app.use(customerRoutes);
app.use(adminRoutes);


db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
console.log('Failed to connect to database!')
console.log(error);
});