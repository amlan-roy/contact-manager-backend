import { Router } from "express";
const router = Router();

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(getCurrentUser);

export default router;
