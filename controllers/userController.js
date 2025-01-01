// controllers/userController.js
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Get All Users (Admin Only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json({ users });
  } catch (error) {
    console.error("Get Users Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update User Role (Admin Only)
const updateUserRole = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { role } = req.body;

  try {
    // Prevent Admins from downgrading themselves
    if (req.user.userId === id && role !== "Admin") {
      return res
        .status(400)
        .json({ message: "Admins cannot downgrade their own role." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "User role updated successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update User Role Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getUserById = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password"); // Exclude password

    if (!user || user.isDeleted) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the requester is Admin or the user themselves
    if (req.user.role !== "Admin" && req.user.userId !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient permissions." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get User By ID Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { getUsers, getUserById, updateUserRole };
