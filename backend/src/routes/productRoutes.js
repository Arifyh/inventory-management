const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Admin routes
router.use(authenticate);
router.use(authorize(['ADMIN']));

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
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
