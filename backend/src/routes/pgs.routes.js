import express from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  countNotVerifiedPGs,
  countVerifiedPGs,
  createPG,
  deletePG,
  getAllPG,
  getAllPGsInfo,
  getPG,
  updatePG,
  verifyPG,
  incrementPGViews,
  getTotalPGViews,
  bulkVerifyPGs,
  bulkDeletePGs,
} from "../controllers/pgs.controllers.js";
import {
  createPGValidator,
  idQueryValidator,
  verifyPropertyValidator,
  getAllPropertiesValidator,
  validate,
} from "../validators/index.js";

const router = express.Router();

// CREATE
router.post(
  "/add-property-pg",
  verifyJWT,
  upload.fields([{ name: "property_photos", maxCount: 5 }]),
  createPGValidator,
  validate,
  createPG
);

// UPDATE
router.put(
  "/update-pg",
  verifyJWT,
  upload.fields([{ name: "property_photos", maxCount: 5 }]),
  idQueryValidator,
  validate,
  updatePG
);

router.put(
  "/verify-pg",
  verifyJWT,
  verifyAdmin,
  verifyPropertyValidator,
  validate,
  verifyPG
);

// DELETE
router.delete(
  "/delete-pg",
  verifyJWT,
  verifyAdmin,
  idQueryValidator,
  validate,
  deletePG
);

// GET
router.get("/find-pg", idQueryValidator, validate, getPG);
router.get("/count-verified-pgs", countVerifiedPGs);
router.get("/count-unverified-pgs", countNotVerifiedPGs);

// GET ALL
router.get("/find-all-pgs", getAllPropertiesValidator, validate, getAllPG);
router.get("/find-all-pgs-info", verifyJWT, verifyAdmin, getAllPGsInfo);

// Views tracking
router.post("/increment-views", idQueryValidator, validate, incrementPGViews);
router.get("/total-views", verifyJWT, verifyAdmin, getTotalPGViews);

// Bulk operations
router.put("/bulk-verify", verifyJWT, verifyAdmin, bulkVerifyPGs);
router.delete("/bulk-delete", verifyJWT, verifyAdmin, bulkDeletePGs);

export default router;
