import Flat from "../models/flats.models.js";

export const createFlat = async (req, res, next) => {
  const newFlat = new Flat(req.body);
  try {
    const savedFlat = await newFlat.save();
    res.status(200).json(savedFlat);
  } catch (error) {
    next(error);
  }
};

export const updateFlat = async (req, res, next) => {
  try {
    const updatedFlat = await Flat.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedFlat);
  } catch (error) {
    next(error);
  }
};

export const deleteFlat = async (req, res, next) => {
  try {
    await Flat.findByIdAndDelete(req.params.id);
    res.status(200).json("Flat has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getFlat = async (req, res, next) => {
  // const failed = true;
  // if (failed) return next(createError(401, "You are not authenticated!"));
  try {
    const flat = await Flat.findById(req.params.id);
    res.status(200).json(flat);
  } catch (error) {
    next(error);
  }
};

export const getAllFlat = async (req, res, next) => {
  try {
    const flats = await Flat.find();
    res.status(200).json(flats);
  } catch (error) {
    next(error);
  }
};
