import express from "express";
import Flat from "../models/flats.models.js";
import {
  createFlat,
  deleteFlat,
  getAllFlat,
  getFlat,
  updateFlat,
} from "../controllers/flats.controllers.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/add-property",
  verifyJWT,
  upload.fields([
    {
      name: "property_photos",
      maxCount: 5
    }
  ]),
  createFlat
);

// UPDATE
router.put("/update-flat", upload.fields([
  {
    name: "property_photos",
    maxCount: 5
  }
]), updateFlat);

// DELETE
router.delete("/delete-flat", deleteFlat);

// GET
router.get("/find-flat", getFlat);

// GET ALL
router.get("/find-all-flats", getAllFlat);

export default router;
