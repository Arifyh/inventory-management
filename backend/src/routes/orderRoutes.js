const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.use(authMiddleware.authenticate);

router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.put("/:id/pay", upload.single('paymentProof'), orderController.payOrder);

module.exports = router;
