import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { contact, deleteContact } from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/", verifyJWT, contact);

router.delete("/delete-contact", verifyJWT, deleteContact);

export default router;