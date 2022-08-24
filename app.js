const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});

const expressSession = require("express-session");
const csrf = require('csurf');
const createSessionConfig = require("./config/session");

const path = require('path');
const express = require('express');
const db = require('./data/database')
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");
const baseRoutes = require("./routes/base.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const initializeCartMiddleware = require("./middlewares/initialize-cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const deleteExpiredCouponFromSession = require('./middlewares/delete-session-coupon');
const deleteExpiredCoupon = require('./util/coupon-expiration');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'));
app.use("/products/assets",express.static('product-data'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(expressSession(createSessionConfig()));

app.use(csrf());

setInterval(deleteExpiredCoupon,1000 * 60);

app.use(deleteExpiredCouponFromSession);
app.use(initializeCartMiddleware);

app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);


app.use(cartRoutes);
app.use(baseRoutes);
app.use(authRoutes);
app.use(protectRoutesMiddleware);
app.use(orderRoutes);
app.use(customerRoutes);
app.use(adminRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);


db.connectToDatabase().then(function(){
    app.listen(port);
}).catch(function(error){
console.log('Failed to connect to database!')
console.log(error);
});