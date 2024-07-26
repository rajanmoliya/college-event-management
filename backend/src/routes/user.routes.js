const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.use(authenticate);

// User profile routes
router.get("/me", userController.getProfile);
router.put("/me", userController.updateProfile);
router.delete("/me", userController.deleteAccount);

// Event registration routes
router.post("/events/:eventId/register", userController.registerForEvent);
router.delete(
  "/events/:eventId/unregister",
  userController.unregisterFromEvent
);
router.get("/events/registered", userController.getRegisteredEvents);

router.get("/search", authenticate, isAdmin, userController.searchUsers);

module.exports = router;
