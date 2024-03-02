const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend api main route..." });
});

app.get("/setup", (req, res) => {
  console.log("############# We'll build database tables ############");
  db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database tables Created");
      res.json({ message: "setup will begin now" });
    })
    .catch((err) => {
      console.log("error:" + err);
      res.json({ Error: err });
    });
});

require("./routes/school.routes")(app);
require("./routes/teacher.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log("############# Server Starting ############");
  console.log(`backend service running on http://localhost:${PORT}`);
});
