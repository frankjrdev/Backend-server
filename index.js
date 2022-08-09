require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");

//Crear servidor express
const app = express();

//Configurar Cors
app.use(cors());

//Public folder
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Database
dbConnection();

//Rutas
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/hospitals", require("./routes/hospitals.routes"));
app.use("/api/doctors", require("./routes/doctors.routes"));
app.use("/api/all", require("./routes/searchs.routes"));
app.use("/api/upload/", require("./routes/upload.routes"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
