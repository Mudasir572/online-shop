const path = require('path');
const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))

app.get('/signup',function(req,res){
    res.render('auth/signup');
});
app.get('/login',function(req,res){
    res.render('auth/login');
});

app.get('/',function(req,res){
    res.render('customer/shop');
})

app.listen(3000);