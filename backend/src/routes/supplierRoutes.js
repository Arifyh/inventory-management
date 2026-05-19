const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate);

// Staff and Admin can view suppliers
router.get('/', authorize(['ADMIN', 'STAFF']), supplierController.getSuppliers);

// Admin-only write routes
router.use(authorize(['ADMIN']));

router.post('/', supplierController.createSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
