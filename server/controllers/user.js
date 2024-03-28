const mongoose = require("mongoose");
const Users = require("../models/userModel");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashPassword) => {
  try {
    return bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(error);
  }
};

const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { fullName, email, password, phone } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        error: true,
        message: "User already register with this email.Please enter another email.",
      });
    }

    const existingPhone = await Users.findOne({ phone });
    if (existingPhone) {
      return res.status(200).json({
        error: true,
        message: "User already register with this phone number.Please enter another phone number.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new Users({
      fullName,
      email,
      password: hashedPassword,
      phone
    }).save();

    return res.status(201).json({
      error: false,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Invalid Email. Please sign up first.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: true,
        message: "Invalid Password.",
      });
    }

    const token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "365 days", });
    return res.status(200).send({
      error: false,
      message: "Login successfully !",
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { fullName, email, phone } = req.body;
    const { id } = req.params;

    let user;
    if (id) {
      user = await Users.findById(id);
    } else {
      user = await Users.findById(req.user._id);
    }

    const existingPhone = await Users.findOne({ phone, _id: { $ne: user._id }, });
    if (existingPhone !== null) {
      return res.status(200).json({
        error: true,
        message: "User already register with this phone number.Please enter another phone number.",
      });
    }

    const existingEmail = await Users.findOne({ email, _id: { $ne: user._id }, });
    if (existingEmail !== null) {
      return res.status(200).json({
        error: true,
        message: "User already register with this email.Please enter another email.",
      });
    }

    const updatedFields = {
      fullName,
      email,
      phone
    };

    const updateUser = await Users.findByIdAndUpdate(user._id, updatedFields, { new: true, });

    return res.status(201).send({
      error: false,
      message: "Updated Successfully !!",
      updateUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Invalid User.",
      });
    }

    await Users.findByIdAndDelete({ _id: id });

    return res.status(200).send({
      error: false,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortField = req.query.sortField || "createdAt";
  const sortOrder = req.query.sortOrder || -1;

  try {
    const skip = (page - 1) * limit;

    const totalUsers = await Users.countDocuments();
    const users = await Users.find().sort({ [sortField]: sortOrder }).skip(skip).limit(limit).populate("department").lean();

    return res.status(200).json({
      error: false,
      message: "Users retrieved successfully.",
      users: users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server error" });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    let getProfile;
    if (id) {
      getProfile = await Users.findById({ _id: id });
    } else {
      getProfile = await Users.findById({ _id: req.user._id });
    }

    return res.status(200).json({
      error: false,
      message: "Users get profile successfully!!",
      getProfile
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    await Users.findAndUpdate(email, { password: hashedPassword });
    res.status(200).send({
      error: false,
      message: "Password changed Successfully.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = { createUser, loginUser, updateUser, deleteUserProfile, getUserProfile, getUsers, changePassword };
