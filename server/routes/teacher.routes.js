// /api/tutorials: GET, POST, DELETE
// /api/tutorials/:id: GET, PUT, DELETE
// /api/tutorials/published: GET

module.exports = (app) => {
  const teachers = require("../controller/teacher.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", teachers.create);

  // Retrieve all Tutorials
  router.get("/", teachers.findAll);

  // Retrieve all published Tutorials
  router.get("/active", teachers.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", teachers.findOne);

  // Update a Tutorial with id
  router.put("/:id", teachers.update);

  // Delete a Tutorial with id
  router.delete("/:id", teachers.delete);

  // Delete all Tutorials
  router.delete("/", teachers.deleteAll);

  app.use("/api/teachers", router);
};
