const express = require("express");
const adminController = require("../controllers/admin.controller");
const imageUploadMiddlewareMulter = require('../middlewares/image-upload');
const router = express.Router();


router.get('/admin/products',adminController.getAllProducts);




router.get('/admin/products/new',adminController.getAddProduct);

router.post('/admin/products',imageUploadMiddlewareMulter,adminController.addProduct)

router.get("/admin/products/:id",adminController.getUpdateProduct)
router.post("/admin/products/:id",imageUploadMiddlewareMulter,adminController.updateProduct)

router.delete("/admin/products/:id",adminController.deleteProduct);

router.get('/admin/orders',adminController.getAllOrders);

router.patch("/admin/orders/:id",adminController.updateOrder);

router.get('/admin/coupon',adminController.getAddCoupon);

router.post('/admin/coupon',adminController.addCoupon);

router.get('/admin/coupon/success',adminController.getCouponSuccess);
module.exports = router;
