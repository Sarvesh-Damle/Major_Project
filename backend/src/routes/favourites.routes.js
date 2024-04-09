import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createFavourite, getFavourite, removeFavourite } from "../controllers/favourites.controllers.js";

const router = express.Router();

router.post("/add-favourites",verifyJWT, createFavourite);

router.get("/get-favourite",verifyJWT, getFavourite);

router.delete("/delete-favourite", verifyJWT, removeFavourite);

export default router;