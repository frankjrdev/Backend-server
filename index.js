require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");

//Crear servidor express
const app = express();

//Configurar Cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Database
dbConnection();

//Rutas
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/login", require("./routes/auth.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
