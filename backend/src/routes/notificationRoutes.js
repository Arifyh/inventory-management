const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticate, authorize } = require("../middlewares/auth");

// Require authentication and ADMIN role for notification routes
router.use(authenticate);
router.use(authorize(["ADMIN"]));

router.get("/", notificationController.getNotifications);
router.put("/read-all", notificationController.markAllAsRead);
router.put("/:id/read", notificationController.markAsRead);

module.exports = router;
