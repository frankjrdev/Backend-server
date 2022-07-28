const { response } = require("express");

const Hospital = require("../models/hospitals.models");

const getHospitals = async (req, res) => {
  const hospitals = await Hospital.find().populate("user", "nombre img email");
  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "updateHospitals",
  });
};

const deleteHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "deleteHospitals",
  });
};

module.exports = {
  getHospitals,
  updateHospital,
  createHospital,
  deleteHospital,
};
