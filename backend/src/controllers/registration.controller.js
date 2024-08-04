const Registration = require("../models/registration.model");
const Event = require("../models/event.model");

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId,
    });
    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: "You are already registered for this event" });
    }

    const newRegistration = new Registration({
      user: userId,
      event: eventId,
    });

    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: "cancelled" },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        message:
          "Registration not found or you are not authorized to cancel it",
      });
    }

    res.json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event")
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.eventId })
      .populate("user", "-password")
      .sort({ registrationDate: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
