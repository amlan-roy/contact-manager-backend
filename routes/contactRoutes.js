import { Router } from "express";
const router = Router();

import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.js";
import { validateToken } from "../middleware/tokenValidationHandler.js";

router.use(validateToken);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
