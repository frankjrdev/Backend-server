const { response } = require("express");
const Doctor = require("../models/doctors.model");

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find()
    .populate("user", "nombre img")
    .populate("hospital", "nombre img");

  res.json({
    ok: true,
    doctors,
  });
};

const createDoctor = async (req, res) => {
  const hospitalID = req.uid;
  const doctor = new Doctor({
    user: hospitalID,
    ...req.body,
  });

  try {
    const doctorDb = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const updateDoctor = (req, res) => {
  res.json({
    ok: true,
    msg: "updateDoctor",
  });
};

const deleteDoctor = (req, res) => {
  res.json({
    ok: true,
    msg: "deleteDoctor",
  });
};

module.exports = {
  getDoctors,
  updateDoctor,
  createDoctor,
  deleteDoctor,
};
