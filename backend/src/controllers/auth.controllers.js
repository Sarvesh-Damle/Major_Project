import User from "../models/users.models.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  if (
    [name, email, password, phoneNumber].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!(email.includes("@"))) {
    throw new ApiError(400, "Valid email address is required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or phone Number already exists");
  }

  // // Make the check only for owner fields
  // const photosLocalPath = req.files?.property_photos[0]?.path;
  //  // or
  // let photosLocalPath;
  // if (req.files && Array.isArray(req.files.property_photos) && req.files.property_photos.length > 0) {
  //   photosLocalPath = req.files.property_photos[0].path;
  // }
  // if (!photosLocalPath) {
  //   throw new ApiError(400, "Please provide property photos");
  // }

  // const propertyPhotos = await uploadOnCloudinary(photosLocalPath);
  // if (!propertyPhotos) {
  //   throw new ApiError(400, "Please provide property photos");
  // }

  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
    // photos: propertyPhotos?.url || ""
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )
});

// const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       name: req.body.name,
//     });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or username!"));

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );

//     const { password, isAdmin, ...otherDetails } = user._doc;

//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({ ...otherDetails });
//   } catch (error) {
//     next(error);
//   }
// };

export { register };
