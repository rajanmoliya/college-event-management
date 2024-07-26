const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/auth.middleware");
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventRegistrations,
} = require("../controllers/registration.controller");

const router = express.Router();

router.post("/", authenticate, registerForEvent);
router.put("/:id/cancel", authenticate, cancelRegistration);
router.get("/my", authenticate, getMyRegistrations);
router.get("/event/:eventId", authenticate, isAdmin, getEventRegistrations);

module.exports = router;
