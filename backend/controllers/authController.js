const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;

    if (!name || !username || !password || !role) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    if (!["Patient", "Doctor"].includes(roleCapitalized)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name: name.trim(),
      username: username.trim(),
      password,
      role: roleCapitalized,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
