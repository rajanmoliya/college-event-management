// server/src/models/user.model.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  studentId: {
    type: String,
    required: function () {
      return this.role === "student";
    },
    unique: true,
  },
  stream: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  semester: {
    type: Number,
    required: function () {
      return this.role === "student";
    },
  },
  mobileNo: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: function () {
      return this.role === "student";
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
