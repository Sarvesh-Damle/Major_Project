import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, google, changeCurrentPassword, updateAccountDetails } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerValidator,
  loginValidator,
  googleAuthValidator,
  changePasswordValidator,
  updateAccountValidator,
  validate,
} from "../validators/index.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.post("/google", googleAuthValidator, validate, google);
router.post("/refresh-token", refreshAccessToken);

// Protected routes
router.post("/logout", verifyJWT, logoutUser);
router.put("/change-password", verifyJWT, changePasswordValidator, validate, changeCurrentPassword);
router.put("/update-account", verifyJWT, updateAccountValidator, validate, updateAccountDetails);

export default router;
