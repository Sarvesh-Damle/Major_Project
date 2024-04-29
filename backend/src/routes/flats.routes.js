import express from "express";
import Flat from "../models/flats.models.js";
import {
  countNotVerifiedFlats,
  countVerifiedFlats,
  createFlat,
  deleteFlat,
  getAllFlat,
  getAllFlatsInfo,
  getFlat,
  updateFlat,
  verifyFlat,
} from "../controllers/flats.controllers.js";
// import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// CREATE
router.post(
  "/add-property-flat",
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
router.put("/update-flat", verifyJWT, upload.fields([
  {
    name: "property_photos",
    maxCount: 5
  }
]), updateFlat);

router.put("/verify-flat", verifyJWT, verifyAdmin, verifyFlat);

// DELETE
router.delete("/delete-flat", verifyJWT, verifyAdmin, deleteFlat);

// GET
router.get("/find-flat", getFlat);
router.get("/count-verified-flats", countVerifiedFlats);
router.get("/count-unverified-flats", countNotVerifiedFlats);

// GET ALL
router.get("/find-all-flats", getAllFlat);
router.get("/find-all-flats-info", verifyJWT, verifyAdmin, getAllFlatsInfo);

export default router;
