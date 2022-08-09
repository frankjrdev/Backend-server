const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/user.model");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    // Generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSingIn = async (req = request, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await Usuario.findOne({ email });
    let user;

    if (!userDB) {
      user = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    //Save user
    await user.save();

    //Generate JWT
    const token = await generarJWT(user.id);

    res.status(200).json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Token de Google no es valido",
    });
  }
};

module.exports = {
  login,
  googleSingIn,
};
