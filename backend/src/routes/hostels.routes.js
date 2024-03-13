import express from "express";
import Hostel from "../models/hostels.models.js";
import {
  countByAddress,
  countByType,
  createHostel,
  deleteHostel,
  getAllHostel,
  getHostel,
  updateHostel,
} from "../controllers/hostels.controllers.js";
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
  createHostel
);

// UPDATE
router.put("/update-hostel", upload.fields([
  {
    name: "property_photos",
    maxCount: 5
  }
]), updateHostel);

// DELETE
router.delete("/delete-hostel", deleteHostel);

// GET
router.get("/find-hostel", getHostel);

// GET ALL
router.get("/find-all-hostels", getAllHostel);

// pending...
router.get("/countByAddress", countByAddress);
router.get("/countByType", countByType);

export default router;
