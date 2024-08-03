// server/src/controller/auth.controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      studentId,
      stream,
      semester,
      mobileNo,
      gender,
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate role
    if (role && role !== "student" && role !== "admin") {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Create user data object
    let userData = { fullName, email, password };

    if (role === "admin") {
      // For admin registration
      if (!fullName || !email || !password || !role) {
        return res
          .status(400)
          .json({ message: "Missing required fields for admin registration" });
      }
      userData.role = "admin";
    } else {
      // For student registration (default)
      if (
        !fullName ||
        !email ||
        !password ||
        !studentId ||
        !stream ||
        !semester ||
        !mobileNo ||
        !gender
      ) {
        return res.status(400).json({
          message: "Missing required fields for student registration",
        });
      }
      userData = {
        ...userData,
        studentId,
        stream,
        semester,
        mobileNo,
        gender,
        role: "student",
      };

      // Check if student with the same studentId already exists
      const existingStudent = await User.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({ message: "Student ID already exists" });
      }
    }

    // Create new user
    user = new User(userData);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create and return JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Create and return JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
