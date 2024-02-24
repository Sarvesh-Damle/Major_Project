import User from "../models/users.models.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateRefreshAndAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  if (
    [name, email, password, phoneNumber].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
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
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
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
  // ------------------------------------------------------
  // req body -> data
  // email or phoneNumber through verification
  // find the user
  // password check
  // access and refresh Token
  // send through cookies
  // res of successful login
  const { email, phoneNumber, password } = req.body;

  if (!(email || phoneNumber)) {
    throw new ApiError(400, "email or phone number is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exists, please register");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "your password is incorrect");
  }

  const { accessToken, refreshToken } = await generateRefreshAndAccessTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  }; // makes it secure so that only server can modify the cookies

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token has been expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateRefreshAndAccessTokens(
      user?._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User Fetched Successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const Users = await User.find();
  return res
    .status(200)
    .json(new ApiResponse(200, Users, "All Users Fetched Successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  if (!name && !email && !phoneNumber) {
    throw new ApiError(400, "Provide atleast one field to change");
  }

  const updateFields = {};
  if (name) {
    updateFields.name = name;
  }
  if (email) {
    updateFields.email = email;
  }
  if (phoneNumber) {
    updateFields.phoneNumber = phoneNumber;
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updateFields },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details Updated Successfully"));
});

// const updatePhotos = asyncHandler(async (req, res) => {
//   const photosLocalPath = req.file?.path; // req.file is for single photo updation

//   if (!photosLocalPath) {
//     throw new ApiError(400, "Photos are missing");
//   }

//   const photos = await uploadOnCloudinary(photosLocalPath);

//   if (!photos.url) {
//     throw new ApiError(400, "Error while uploading photos");
//   }

//   // delete old image
//   const userToUpdate = await User.findById(req.user?._id);
//   const oldPhotosUrl = userToUpdate.property_photos;

//   if (oldPhotosUrl) {
//     await deleteFromCloudinary(oldPhotosUrl);
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     { $set: { property_photos: photos.url } },
//     { new: true }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Photos Updated Successfully"));
// });

// Function to remove a particular photo
// const removePhoto = async (publicId) => {
//   try {
//     if (!publicId) return null;
//     // Deleting file from Cloudinary
//     const response = await cloudinary.uploader.destroy(publicId);
//     console.log("File deleted from Cloudinary successfully!!");
//     return response;
//   } catch (error) {
//     console.error("Error deleting file from Cloudinary:", error);
//     return null;
//   }
// };

// API route for updating property images
// const updatePropertyImages = async (req, res) => {
//   const { remove, add } = req.body;

//   // Remove specified photos
//   if (remove && remove.length > 0) {
//     for (let publicId of remove) {
//       await removePhoto(publicId);
//     }
//   }

//   // Add new photos
//   if (add && add.length > 0) {
//     for (let file of add) {
//       const response = await uploadOnCloudinary(file.path);
//       if (!response.url) {
//         throw new ApiError(400, "Error while uploading photos");
//       }
//     }
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, "Photos updated successfully"));
// };

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getAllUsers,
  updateAccountDetails,
};
