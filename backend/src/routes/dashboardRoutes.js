const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { authenticate } = require("../middlewares/auth");

// Require authentication for dashboard stats
router.get("/stats", authenticate, dashboardController.getDashboardStats);

module.exports = router;
