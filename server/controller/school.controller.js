const db = require("../models");
const Schools = db.schools;
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
  const school = {
    name: req.body.name,
    description: req.body.description,
    active: req.body.active,
  };

  // Save Tutorial in the database
  Schools.create(school)
    .then((data) => {
      const results = JSON.stringify(data);
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the School.",
      });
    });
};

// Retrieve all Schools from the database.
exports.findAll = (req, res) => {
  //const name = req.query.name;
  //var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Schools.findAll()
    .then((data) => {
      if (!data || data === null || data === undefined) {
        res.send({ message: "No schools exist to list." });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the School(s) info.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Schools.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find School with the given id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving School with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Schools.update(req.body, {
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

  Schools.destroy({
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

// Delete all Schools from the database.
exports.deleteAll = (req, res) => {
  Schools.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Schools were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Schools from database.",
      });
    });
};

// Find all published Schools
exports.findAllActive = (req, res) => {
  Schools.findAll({ where: { active: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Schools from database.",
      });
    });
};
