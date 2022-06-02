require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");

//Crear servidor express
const app = express();

//Configurar Cors
app.use(cors());

//Database
dbConnection();

//Rutas
app.get("/", (req, res) => {
  res.status(400).json({
    ok: true,
    msj: "Hola Mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
