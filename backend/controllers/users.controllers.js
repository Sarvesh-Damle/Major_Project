import User from "../models/users.models.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    // const failed = true;
    // if (failed) return next(createError(401, "You are not authenticated!"));
    try {
        const User = await User.findById(req.params.id);
        res.status(200).json(User);
    } catch (error) {
        next(error);
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users);
    } catch (error) {
        next(error);
    }
}