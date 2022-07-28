/*
    route: api/all/:search
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getAll,
  getDocumentsCollection,
} = require("../controllers/searchs.controller");

const router = Router();

router.get("/:search", validarJWT, getAll);
router.get("/collection/:table/:search", validarJWT, getDocumentsCollection);

module.exports = router;
