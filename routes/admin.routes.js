const express = require("express");
const adminController = require("../controllers/admin.controller");
const imageUploadMiddlewareMulter = require('../middlewares/image-upload');
const router = express.Router();


router.get('/admin/products',adminController.getAllProducts);

router.get('/admin/orders',adminController.getAllOrders);

router.get('/admin/products/new',adminController.getAddProduct);

router.post('/admin/products',imageUploadMiddlewareMulter,adminController.addProduct)

module.exports = router;
