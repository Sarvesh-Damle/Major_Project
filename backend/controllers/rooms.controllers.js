import Room from "../models/rooms.models.js";

export const createRoom = async (req, res, next) => {
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted");
    } catch (error) {
        next(error);
    }
}

export const getRoom = async (req, res, next) => {
    // const failed = true;
    // if (failed) return next(createError(401, "You are not authenticated!"));
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
}