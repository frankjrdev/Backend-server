const { response, request } = require("express");
const { json } = require("express/lib/response");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.models");
const User = require("../models/user.model");

const getAll = async (req = request, res = response) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  const [users, doctors, hospitals] = await Promise.all([
    Hospital.find({ nombre: regex }),
    Doctor.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    doctors,
  });
};

const getDocumentsCollection = async (req = request, res = response) => {
  const search = req.params.search;
  const table = req.params.table;
  const regex = new RegExp(search, "i");

  let data = [];

  switch (table) {
    case "doctors":
      data = await Doctor.find({ nombre: regex })
        .populate("user", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitals":
      data = await Hospital.find({ nombre: regex }).populate(
        "user",
        "nombre img"
      );
      break;
    case "users":
      data = await User.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
        msg: "Your request have to be  about hospitals,doctors or users",
      });
  }

  res.json({
    ok: true,
    resultado: data,
  });
};

module.exports = {
  getAll,
  getDocumentsCollection,
};
