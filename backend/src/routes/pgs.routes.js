import express from "express";
import PG from "../models/pgs.models.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
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
} from "../controllers/pgs.controllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post(
  "/add-property-pg",
  verifyJWT,
  upload.fields([
    {
      name: "property_photos",
      maxCount: 5,
    },
  ]),
  createPG
);

// UPDATE
router.put(
  "/update-pg",
  upload.fields([
    {
      name: "property_photos",
      maxCount: 5,
    },
  ]),
  updatePG
);
router.put("/verify-pg", verifyJWT, verifyAdmin, verifyPG);
// DELETE
router.delete("/delete-pg", verifyJWT, verifyAdmin,deletePG);

// GET
router.get("/find-pg", getPG);
router.get("/count-verified-pgs", countVerifiedPGs);
router.get("/count-unverified-pgs", countNotVerifiedPGs);

// GET ALL
router.get("/find-all-pgs", getAllPG);
router.get("/find-all-pgs-info", verifyJWT, verifyAdmin, getAllPGsInfo);

// pending...
// router.get("/countByAddress", countByAddress);
// router.get("/countByType", countByType);

export default router;
