// /api/tutorials: GET, POST, DELETE
// /api/tutorials/:id: GET, PUT, DELETE
// /api/tutorials/published: GET

module.exports = (app) => {
  const schools = require("../controller/school.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", schools.create);

  // Retrieve all Tutorials
  router.get("/", schools.findAll);

  // Retrieve all published Tutorials
  router.get("/active", schools.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", schools.findOne);

  // Update a Tutorial with id
  router.put("/:id", schools.update);

  // Delete a Tutorial with id
  router.delete("/:id", schools.delete);

  // Delete all Tutorials
  router.delete("/", schools.deleteAll);

  app.use("/api/schools", router);
};
