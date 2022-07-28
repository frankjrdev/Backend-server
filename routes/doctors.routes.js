/*
    Hospitals
    route: 'api/doctors
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getDoctors,
  updateDoctor,
  createDoctor,
  deleteDoctor,
} = require("../controllers/doctors.controller.js");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getDoctors);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").notEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
  ],
  createDoctor
);

router.put("/:id", [], updateDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;
