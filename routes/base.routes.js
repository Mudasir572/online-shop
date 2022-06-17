const express = require("express");


const router = express.Router();
router.get("/",function(req,res){
    res.redirect("/products")
})

router.get('/403',function(req,res){
res.status(403).render("shared/403");
});
router.get('/401',function(req,res){
res.status(401).render("shared/401");
})
router.get('/coupon/error',function(req,res){
res.render("shared/coupon-error");
})
module.exports = router;