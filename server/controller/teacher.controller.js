const db = require("../models");
const Teachers = db.teachers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.t_first_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const teacher = {
    t_first_name: req.body.t_first_name,
    t_last_name: req.body.t_last_name,
    t_active: req.body.active,
  };

  // Save Tutorial in the database
  Teachers.create(teacher)
    .then((data) => {
      const results = JSON.stringify(data);
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Teacher.",
      });
    });
};

// Retrieve all Schools from the database.
exports.findAll = (req, res) => {
  //const name = req.query.name;
  //var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Teachers.findAll()
    .then((data) => {
      if (!data || data === null || data === undefined) {
        res.send({ message: "No Teachers exist to list." });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving the Teacher(s) info.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teachers.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Teacher with the given id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Teacher with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Teachers.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher info was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Teachers info with id=${id}. Maybe Teacher was not found in database or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Teacher with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Teachers.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Teacher was deleted from database successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Teacher with id=${id}. Maybe School was not found in database!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Teacher with id=" + id,
      });
    });
};

// Delete all Schools from the database.
exports.deleteAll = (req, res) => {
  Teachers.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Teachers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Teachers from database.",
      });
    });
};

// Find all published Teachers
exports.findAllActive = (req, res) => {
  Teachers.findAll({ where: { t_active: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Teachers from database.",
      });
    });
};
