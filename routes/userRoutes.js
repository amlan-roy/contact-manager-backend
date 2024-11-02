import { Router } from "express";
import { validateToken } from "../middleware/tokenValidationHandler.js";
const router = Router();

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, getCurrentUser);

export default router;
