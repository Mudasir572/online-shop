const express = require("express");


const router = express.Router();
router.get("/",function(req,res){
    res.redirect("/products")
})

router.get('/404',function(req,res){
res.status(404).render("shared/404");
});
router.get('/401',function(req,res){
res.status(401).render("shared/401");
})
module.exports = router;