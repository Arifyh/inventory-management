const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/auth');

// Public route for visitors
router.get('/public', categoryController.getPublicCategories);

router.use(authenticate);

// Staff and Admin can view categories
router.get('/', authorize(['ADMIN', 'STAFF']), categoryController.getCategories);

// Admin-only write routes
router.use(authorize(['ADMIN']));

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
