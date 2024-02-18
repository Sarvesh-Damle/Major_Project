import express from "express";
import { register } from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// router.post("/register", upload.fields([{
//     name: "property_photos",
//     maxCount: 5
// }]), register);
router.post("/register", register);

// router.post("/login", login);

export default router;
