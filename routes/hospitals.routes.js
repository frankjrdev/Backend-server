/*
    Hospitals
    route: 'api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitals,
  updateHospital,
  createHospital,
  deleteHospital,
} = require("../controllers/hospitals.controller");

const router = Router();

router.get("/", getHospitals);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").notEmpty(),
    validarCampos,
  ],
  createHospital
);

router.put("/:id", [], updateHospital);

router.delete("/:id", deleteHospital);

module.exports = router;
