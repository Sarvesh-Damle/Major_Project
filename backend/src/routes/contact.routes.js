import express from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { contact, deleteContact } from "../controllers/contact.controllers.js";
import { contactValidator, idQueryValidator, validate } from "../validators/index.js";

const router = express.Router();

router.post("/", verifyJWT, contactValidator, validate, contact);

router.delete("/delete-contact", verifyJWT, verifyAdmin, idQueryValidator, validate, deleteContact);

export default router;
