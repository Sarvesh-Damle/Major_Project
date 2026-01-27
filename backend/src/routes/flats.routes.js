import express from "express";
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
  incrementFlatViews,
  getTotalFlatViews,
  bulkVerifyFlats,
  bulkDeleteFlats,
} from "../controllers/flats.controllers.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createFlatValidator,
  idQueryValidator,
  verifyPropertyValidator,
  getAllPropertiesValidator,
  validate,
} from "../validators/index.js";

const router = express.Router();

// CREATE
router.post(
  "/add-property-flat",
  verifyJWT,
  upload.fields([{ name: "property_photos", maxCount: 5 }]),
  createFlatValidator,
  validate,
  createFlat
);

// UPDATE
router.put(
  "/update-flat",
  verifyJWT,
  upload.fields([{ name: "property_photos", maxCount: 5 }]),
  idQueryValidator,
  validate,
  updateFlat
);

router.put(
  "/verify-flat",
  verifyJWT,
  verifyAdmin,
  verifyPropertyValidator,
  validate,
  verifyFlat
);

// DELETE
router.delete(
  "/delete-flat",
  verifyJWT,
  verifyAdmin,
  idQueryValidator,
  validate,
  deleteFlat
);

// GET
router.get("/find-flat", idQueryValidator, validate, getFlat);
router.get("/count-verified-flats", countVerifiedFlats);
router.get("/count-unverified-flats", countNotVerifiedFlats);

// GET ALL
router.get("/find-all-flats", getAllPropertiesValidator, validate, getAllFlat);
router.get("/find-all-flats-info", verifyJWT, verifyAdmin, getAllFlatsInfo);

// Views tracking
router.post("/increment-views", idQueryValidator, validate, incrementFlatViews);
router.get("/total-views", verifyJWT, verifyAdmin, getTotalFlatViews);

// Bulk operations
router.put("/bulk-verify", verifyJWT, verifyAdmin, bulkVerifyFlats);
router.delete("/bulk-delete", verifyJWT, verifyAdmin, bulkDeleteFlats);

export default router;
