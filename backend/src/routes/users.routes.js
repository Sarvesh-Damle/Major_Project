import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/users.controllers.js";
import { getCurrentUser } from "../controllers/auth.controllers.js";
import { verifyJWT, verifyAdmin, verifyOwnerOrAdmin } from "../middlewares/auth.middleware.js";
import { idQueryValidator, validate } from "../validators/index.js";

const router = express.Router();

// UPDATE
router.put("/update-user", verifyJWT, idQueryValidator, validate, updateUser);

// DELETE
router.delete("/delete-user", verifyJWT, verifyAdmin, idQueryValidator, validate, deleteUser);

// GET current user
router.get("/me", verifyJWT, getCurrentUser);

// GET user by id
router.get("/get-user-info", verifyJWT, idQueryValidator, validate, getUser);

// GET ALL users (admin only)
router.get("/", verifyJWT, verifyAdmin, getAllUser);

export default router;
