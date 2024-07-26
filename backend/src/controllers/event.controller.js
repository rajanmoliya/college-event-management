const Event = require("../models/event.model");

exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      createdBy: req.user.id,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "fullName email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "fullName email"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchEvents = async (req, res) => {
  try {
    const { title, category, startDate, endDate, location } = req.query;

    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: "Server error" });
  }
};
