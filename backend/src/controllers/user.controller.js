const User = require("../models/user.model");
const Event = require("../models/event.model");
const Registration = require("../models/registration.model");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, mobileNo, stream, semester } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, mobileNo, stream, semester },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: req.user.id,
      event: req.params.eventId,
    });

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    const registration = new Registration({
      user: req.user.id,
      event: req.params.eventId,
    });

    await registration.save();

    res.json({ message: "Successfully registered for the event" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.unregisterFromEvent = async (req, res) => {
  try {
    const result = await Registration.findOneAndDelete({
      user: req.user.id,
      event: req.params.eventId,
    });

    if (!result) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Successfully unregistered from the event" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getRegisteredEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event")
      .sort({ registrationDate: -1 });

    const events = registrations.map((reg) => reg.event);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { fullName, email, role, stream, semester } = req.query;

    let query = {};

    if (fullName) {
      query.fullName = { $regex: fullName, $options: "i" };
    }

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    if (role) {
      query.role = role;
    }

    if (stream) {
      query.stream = { $regex: stream, $options: "i" };
    }

    if (semester) {
      query.semester = parseInt(semester);
    }

    const users = await User.find(query)
      .select("-password")
      .sort({ fullName: 1 });

    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
