const path = require('path');
const express = require('express');

const app = express();
const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/customer.routes");


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.use(authRoutes);
app.use(customerRoutes);
app.use(adminRoutes);

app.listen(3000);