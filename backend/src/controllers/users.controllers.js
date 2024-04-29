import User from "../models/users.models.js";

export const updateUser = async (req, res, next) => {
  try {
    const {name, email, phoneNumber, admin} = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.query.id,
      { $set: {name, email, phoneNumber, isAdmin:admin }},
      { new: true }
    );
    res.status(200).json({message: "User updated successfully", updatedUser});
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) {
      res.status(200).json({ message: "User not found" });
    } else {
      await User.findByIdAndDelete(req.query.id);
      res.status(200).json({ message: "User has been deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  // const failed = true;
  // if (failed) return next(createError(401, "You are not authenticated!"));
  try {
    const user = await User.findById(req.query.id).select("-password -refreshToken");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const Users = await User.find().select("-password -refreshToken -isAdmin");
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};
