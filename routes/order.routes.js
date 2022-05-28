const express = require("express");

const router = express.Router();

const ordersController = require('../controllers/orders.controller');


router.get('/orders',ordersController.getOrders);

router.post('/orders',ordersController.addOrder);

router.get('/orders/success', ordersController.getSuccess);

router.get('/orders/failure', ordersController.getFailure);



module.exports = router;
