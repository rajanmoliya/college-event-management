const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");
const { authenticate, isAdmin } = require("../middlewares/auth.middleware");
const eventController = require("../controllers/event.controller");

router.post("/create", authenticate, isAdmin, async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      createdBy: req.user.id,
    });
    await event.save();
    res.json({ message: "Event created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating event" });
  }
});

router.get("/search", eventController.searchEvents);

module.exports = router;
