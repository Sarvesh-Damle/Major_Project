import Apartment from "../models/apartments.models.js";

export const createApartment = async (req, res, next) => {
  const newApartment = new Apartment(req.body);
  try {
    const savedApartment = await newApartment.save();
    res.status(200).json(savedApartment);
  } catch (error) {
    next(error);
  }
};

export const updateApartment = async (req, res, next) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedApartment);
  } catch (error) {
    next(error);
  }
};

export const deleteApartment = async (req, res, next) => {
  try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.status(200).json("Apartment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getApartment = async (req, res, next) => {
  // const failed = true;
  // if (failed) return next(createError(401, "You are not authenticated!"));
  try {
    const apartment = await Apartment.findById(req.params.id);
    res.status(200).json(apartment);
  } catch (error) {
    next(error);
  }
};

export const getAllApartment = async (req, res, next) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    next(error);
  }
};
export const countByAddress = async (req, res, next) => {
  const address = req.query.address.split(",");
  try {
    const list = await Promise.all(
      address.map((address) => {
        return Apartment.countDocuments({ address: address });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const singleRoomCount = await Apartment.countDocuments({
      room_type: "Single Room",
    });
    const doubleSharingCount = await Apartment.countDocuments({
      room_type: "Double Sharing",
    });
    const tripleSharingCount = await Apartment.countDocuments({
      room_type: "Triple Sharing",
    });
    const fourSharingCount = await Apartment.countDocuments({
      room_type: "Four Sharing",
    });
    res.status(200).json([
      {room_type:"Single Room", count:singleRoomCount},
      {room_type:"Double Sharing", count:doubleSharingCount},
      {room_type:"Triple Sharing", count:tripleSharingCount},
      {room_type:"Four Sharing", count:fourSharingCount},
    ]);
  } catch (error) {
    next(error);
  }
};
