const fs = require("fs");

const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.models");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    //delete back image
    fs.unlinkSync(path);
  }
};

const uploadImagen = async (type, id, nameFile) => {
  let oldPath = "";
  switch (type) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("Doesn't exist doctor id");
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImage(oldPath);

      doctor.img = nameFile;
      await doctor.save();
      return true;

      break;

    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("Doesn't exist user id");
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);

      user.img = nameFile;
      await user.save();
      return true;
      break;

    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("Doesn't exist hospital id");
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);

      hospital.img = nameFile;
      await hospital.save();
      return true;
      break;
  }
};

module.exports = {
  uploadImagen,
};
