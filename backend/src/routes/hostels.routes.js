import express from "express";
import {
  countByAddress,
  countByType,
  countHostelsByType,
  countNotVerifiedHostels,
  countVerifiedHostels,
  createHostel,
  deleteHostel,
  getAllHostel,
  getAllHostelsInfo,
  getHostel,
  updateHostel,
  verifyHostel,
} from "../controllers/hostels.controllers.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { handleFileUploadError, upload } from "../middlewares/multer.middleware.js";
import {
  createHostelValidator,
  idQueryValidator,
  verifyPropertyValidator,
  getAllPropertiesValidator,
  validate,
} from "../validators/index.js";

const router = express.Router();

// CREATE
router.post(
  "/add-property",
  verifyJWT,
  upload.fields([{ name: "property_photos", maxCount: 5 }]),
  handleFileUploadError,
  createHostelValidator,
  validate,
  createHostel
);

// UPDATE
router.put(
  "/update-hostel",
  verifyJWT,
  upload.fields([{ name: "property_photos", maxCount: 5 }]),
  idQueryValidator,
  validate,
  updateHostel
);

router.put(
  "/verify-hostel",
  verifyJWT,
  verifyAdmin,
  verifyPropertyValidator,
  validate,
  verifyHostel
);

// DELETE
router.delete(
  "/delete-hostel",
  verifyJWT,
  verifyAdmin,
  idQueryValidator,
  validate,
  deleteHostel
);

// GET
router.get("/find-hostel", idQueryValidator, validate, getHostel);
router.get("/count-verified-hostels", countVerifiedHostels);
router.get("/count-unverified-hostels", countNotVerifiedHostels);
router.get("/count-hostel-type", countHostelsByType);

// GET ALL
router.get("/find-all-hostels", getAllPropertiesValidator, validate, getAllHostel);
router.get("/find-all-hostels-info", verifyJWT, verifyAdmin, getAllHostelsInfo);

// Count endpoints
router.get("/countByAddress", countByAddress);
router.get("/countByType", countByType);

export default router;
