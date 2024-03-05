const db = require("../models");
const Departments = db.departments;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const department = {
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
    schoolId: req.body.schoolId
  };

  // Save Tutorial in the database
  Departments.create(department)
    .then((data) => {
      if(!data){
        res.status(404).send({results: "System failed to create department, try again"});
      }
      res.status(201).send(data)
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message,
      });
    });
};

// Retrieve all Departments from the database.
exports.findAll = (req, res) => {
  //const name = req.query.name;
  //var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Departments.findAll()
    .then((data) => {
      if (!data || data === null || data === undefined) {
        res.send({ results: "No Departments exist to list." });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Departments.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Department with the given id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Departments.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "School info was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update School info with id=${id}. Maybe School was not found in database or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating School with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Departments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "School was deleted from database successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete School with id=${id}. Maybe School was not found in database!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete School with id=" + id,
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
  Departments.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Departments listed in the database.",
      });
    });
};

// Find all published Departments
exports.findAllActive = (req, res) => {
  Departments.findAll({ where: { active: true } })
    .then((data) => {
      if (!data || data.length === 0) {
        res.send({ message: "No Active Departments Found to list!" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Departments from database.",
      });
    });
};
exports.findAllInActive = (req, res) => {
  Departments.findAll({ where: { active: false } })
    .then((data) => {
      if (!data) {
        res.send({ message: "No inactive Departments were found!" });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err,
        message,
      });
    });
};
