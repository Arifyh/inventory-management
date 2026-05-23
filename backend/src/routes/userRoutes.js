const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

// All routes require ADMIN role
router.use(authenticate);
router.use(authorize(['ADMIN']));

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.patch('/:id/toggle-status', userController.toggleUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;
