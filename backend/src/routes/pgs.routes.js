import express from "express";
import PG from "../models/pgs.models.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createPG, deletePG, getAllPG, getPG, updatePG } from "../controllers/pgs.controllers.js";

const router = express.Router();

// CREATE
router.post("/add-property", verifyJWT, upload.fields([
    {
      name: "property_photos",
      maxCount: 5
    }
  ]), createPG);

// UPDATE
router.put("/update-pg", upload.fields([
    {
      name: "property_photos",
      maxCount: 5
    }
  ]), updatePG);

// DELETE
router.delete("/delete-pg", deletePG);

// GET
router.get("/find-pg", getPG);

// GET ALL
router.get("/find-all-pgs", getAllPG);

// pending...
// router.get("/countByAddress", countByAddress);
// router.get("/countByType", countByType);

export default router;