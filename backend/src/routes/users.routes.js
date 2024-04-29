import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/users.controllers.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { getCurrentUser } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in")
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and you can delete your account")
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, you are logged in and you can delete any account")
// });

// UPDATE
router.put("/update-user", verifyJWT, updateUser);
// DELETE
router.delete("/delete-user", verifyJWT, verifyAdmin, deleteUser);
// GET
router.get("/get-user-info", verifyJWT, getUser);
// GET ALL
router.get("/", verifyJWT, verifyAdmin, getAllUser);

router.get("/me",verifyToken,getCurrentUser);



export default router;
