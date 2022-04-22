const expressSession = require("express-session");

const createSessionConfig = require("./config/session");

const path = require('path');
const express = require('express');
const db = require('./data/database')

const app = express();


const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/customer.routes");



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.use(expressSession(createSessionConfig()));


app.use(authRoutes);
app.use(customerRoutes);
app.use(adminRoutes);


db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
console.log('Failed to connect to database!')
console.log(error);
});