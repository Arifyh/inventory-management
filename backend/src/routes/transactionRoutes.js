const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticate, authorize } = require('../middlewares/auth');

// Require authentication for all routes
router.use(authenticate);

// Everyone (ADMIN & STAFF) can view and create transactions
router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);

module.exports = router;
