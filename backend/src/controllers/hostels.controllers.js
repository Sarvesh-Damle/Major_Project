import Hostel from "../models/hostels.models.js";

export const createHostel = async (req, res, next) => {
  const newHostel = new Hostel(req.body);
  try {
    const savedHostel = await newHostel.save();
    res.status(200).json(savedHostel);
  } catch (error) {
    next(error);
  }
};

export const updateHostel = async (req, res, next) => {
  try {
    const updatedHostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHostel);
  } catch (error) {
    next(error);
  }
};

export const deleteHostel = async (req, res, next) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hostel has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getHostel = async (req, res, next) => {
  // const failed = true;
  // if (failed) return next(createError(401, "You are not authenticated!"));
  try {
    const hostel = await Hostel.findById(req.params.id);
    res.status(200).json(hostel);
  } catch (error) {
    next(error);
  }
};

export const getAllHostel = async (req, res, next) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (error) {
    next(error);
  }
};
export const countByAddress = async (req, res, next) => {
  const address = req.query.address.split(",");
  try {
    const list = await Promise.all(
      address.map((address) => {
        return Hostel.countDocuments({ address: address });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const singleRoomCount = await Hostel.countDocuments({
      room_type: "Single Room",
    });
    const doubleSharingCount = await Hostel.countDocuments({
      room_type: "Double Sharing",
    });
    const tripleSharingCount = await Hostel.countDocuments({
      room_type: "Triple Sharing",
    });
    const fourSharingCount = await Hostel.countDocuments({
      room_type: "Four Sharing",
    });
    res.status(200).json([
      { room_type: "Single Room", count: singleRoomCount },
      { room_type: "Double Sharing", count: doubleSharingCount },
      { room_type: "Triple Sharing", count: tripleSharingCount },
      { room_type: "Four Sharing", count: fourSharingCount },
    ]);
  } catch (error) {
    next(error);
  }
};
