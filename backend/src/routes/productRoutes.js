const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public routes for visitors
router.get('/public', productController.getPublicProducts);
router.get('/public/:id', productController.getPublicProductById);

// Require authentication for all routes below
router.use(authenticate);

// Staff and Admin can view products
router.get('/', authorize(['ADMIN', 'STAFF']), productController.getProducts);
router.get('/:id', authorize(['ADMIN', 'STAFF']), productController.getProductById);

// Admin-only write routes
router.use(authorize(['ADMIN']));

router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.softDeleteProduct);

// Status route
router.patch('/:id/toggle-publish', productController.togglePublishStatus);

// Image routes
router.post('/:id/images', upload.array('images', 5), productController.uploadProductImages);
router.delete('/:id/images/:imageId', productController.deleteProductImage);
router.patch('/:id/images/:imageId/thumbnail', productController.setThumbnail);

module.exports = router;
