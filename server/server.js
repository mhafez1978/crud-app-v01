const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const corsOptions = {
  origin: "http://localhost:7777",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// swagger options object
const swaggerOptions = {
  definition: {
    openapi:"3.0.0",
    info: {
      title: "Node LMS API",
      description: "Backend API Node, Express, MySQL, SequelizeORM",
      contact: {
        name: "Mohamed Hafez",
        email: "admin@nodesunlimited.com",
        url: "https://beingmohamedhafez.com",
      },
      termsOfService: "http://localhost:7777/tos",
      version: "v1 - 1.0.0",
      license: {
        name: "For Profit",
        url: "http://beingmohamedhafez.com",
      },
    },
    servers: [
        {
            url:"http://localhost:7777"
        },
        {
            url:"http://some-domain-name.tld"
        }
    ],
  },
  apis: ["server.js", "./routes/*.routes.js"],
};


const swaaggerDocs = swaggerJsDoc(swaggerOptions);
//telling swagger which API url to use to mount swagger-express server
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaaggerDocs));



/**
* @swagger
*  tags:
*    name: Configurations
*    description: The School API Settings & Configurations EndPoints.
*/

/**
 * @swagger
 * /:
 *  get:
 *      summary: Main API Route
 *      tags: [Configurations]
 *      description: This is main API GET request
 *      responses:
 *       '200':
 *          description: Will show message Welcome to API main route.
 * 
 */
app.get("/", (req, res) => {
  res.json({ results: "Welcome to backend api main route..." });
});

// automate table re-creation route

/**
 * @swagger
 * /api/setup:
 *  get:
 *      summary: Drop then Create Tables in Database
 *      tags: [Configurations]
 *      description: This EndPoint will allow admin to setup all database tables. During development this is set to drop and re-create database.
 *      responses:
 *       '200':
 *          description: Will show message to status of database sync operations.
 * 
 */
app.get("/api/setup", (req, res) => {
  console.log("############# We'll build database tables ############");
  db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database tables Created");
      res.json({ results: "All database tables were dropped and re-created" });
    })
    .catch((err) => {
      console.log("error:" + err);
      res.json({ Error: err });
    });
});

// routes for school model
require("./routes/school.routes")(app);
//routes for teacher model
require("./routes/teacher.routes")(app);

// this is default in case of unmatched routes catch all function
app.use("*", (req, res) => {
  // Invalid request
  res.json({
    error: {
      name: "Node LMS API Backend Server",
      status: 404,
      message: "Problem: API EndPoint Does Not Exist.",
      statusCode: 404,
      stack: "http://localhost:7777/",
    },
    message: "This is an Invalid API request! ",
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log("############# Server Starting ############");
  console.log(`backend service running on http://localhost:${PORT}`);
});
