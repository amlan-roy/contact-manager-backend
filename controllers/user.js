import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import {
  encryptPassword,
  pwdAndEncryptedPwdSame,
} from "./../helpers/encyption.js";
import jwt from "jsonwebtoken";

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
});

/**
 * @description Login user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields mandatory!");
  }

  const user = await UserModel.findOne({ email });

  const userPassword = user.password;

  const userPasswordValid =
    user && (await pwdAndEncryptedPwdSame(password, userPassword));
  if (userPasswordValid) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or passwordis not valid");
  }
});

/**
 * @description Get current user
 * @route GET /api/users/current
 * @access public
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error("An error occurred while fetching the user!");
  }
  res.status(200).json(req.user);
});

export { registerUser, loginUser, getCurrentUser };
