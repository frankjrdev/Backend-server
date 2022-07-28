/*
    route: api/upload/
*/

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, returnImage } = require("../controllers/upload.controller");
const router = Router();

router.use(expressFileUpload());
router.put("/:type/:id", validarJWT, fileUpload);
router.get("/:type/:image", returnImage);
module.exports = router;
