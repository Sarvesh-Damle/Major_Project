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
import { verifyAdmin } from "../utils/verifyToken.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { handleFileUploadError, upload } from "../middlewares/multer.middleware.js";

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
  handleFileUploadError,
  createHostel
);

// UPDATE
router.put(
  "/update-hostel",
  verifyJWT,
  upload.fields([
    {
      name: "property_photos",
      maxCount: 5,
    },
  ]),
  updateHostel
);

router.put("/verify-hostel", verifyJWT, verifyAdmin, verifyHostel);

// DELETE
router.delete("/delete-hostel", verifyJWT, verifyAdmin, deleteHostel);

// GET
router.get("/find-hostel", getHostel);
router.get("/count-verified-hostels", countVerifiedHostels);
router.get("/count-unverified-hostels", countNotVerifiedHostels);
router.get("/count-hostel-type", countHostelsByType);

// GET ALL
router.get("/find-all-hostels", getAllHostel);
router.get("/find-all-hostels-info", verifyJWT, verifyAdmin, getAllHostelsInfo);

// pending...
router.get("/countByAddress", countByAddress);
router.get("/countByType", countByType);

export default router;
