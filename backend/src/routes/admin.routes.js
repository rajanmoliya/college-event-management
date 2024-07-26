const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

// Ensure all admin routes are protected
router.use(authenticate, isAdmin);

// User management
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

// Event management
router.post("/events", adminController.createEvent);
router.put("/events/:id", adminController.updateEvent);
router.delete("/events/:id", adminController.deleteEvent);

// Registration management
router.get("/events/:id/registrations", adminController.getEventRegistrations);

// Dashboard data
router.get("/dashboard", adminController.getDashboardData);

module.exports = router;
