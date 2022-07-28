const path = require("path");
const fs = require("fs");
const { response, request } = require("express");
const { v4: uuidv4 } = require("uuid");
const { uploadImagen } = require("../helpers/upload-images");

const fileUpload = (req = request, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  const validsType = ["hospitals", "doctors", "users"];

  if (!validsType.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "Bad request. Only exist doctors, hospitals and users type",
    });
  }

  //Validate file exists
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  //Process file
  const file = req.files.image;
  const cutName = file.name.split(".");
  const extensionFile = cutName[cutName.length - 1];

  //Validate extension
  const validsExtension = ["jpg", "jpeg", "png", "gif"];
  if (!validsExtension.includes(extensionFile)) {
    return res.status(400).json({
      ok: false,
      msg: "Bad request. invalid file type",
    });
  }

  //Generate file name
  const nameFile = `${uuidv4()}.${extensionFile}`;

  //Path to save file
  const path = `./uploads/${type}/${nameFile}`;

  //Move image
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //Upload data base

    uploadImagen(type, id, nameFile);

    res.json({
      ok: true,
      msg: "Succes upload file",
      nameFile,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  //Default image. path empty
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  returnImage,
};
