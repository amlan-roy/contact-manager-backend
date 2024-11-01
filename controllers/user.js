import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import { encryptPassword } from "./../helpers/encyption.js";

/**
 * @description Register a user
 * @route POST /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const emailTaken = await UserModel.findOne({
    email,
  });
  const usernameTaken = await UserModel.findOne({
    username,
  });

  if (emailTaken) {
    res.status(400);
    throw new Error("User already registered with the email!");
  }
  if (usernameTaken) {
    res.status(400);
    throw new Error("Username already taken!");
  }

  const hashedPassword = await encryptPassword(password);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  // res.status(200).json({ message: "User registered" });
});

/**
 * @description Login user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  // const contacts = await ContactModel.find();
  res.status(200).json({ message: "User login" });
});

/**
 * @description Get current user
 * @route GET /api/users/current
 * @access public
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  // const contacts = await ContactModel.find();
  res.status(200).json({ message: "Current user information" });
});

export { registerUser, loginUser, getCurrentUser };
