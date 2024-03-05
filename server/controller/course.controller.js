const db = require("../models");
const Courses = db.courses;
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
  const course = {
    title: req.body.name,
    description: req.body.description,
    active: req.body.active,
  };

  // Save Tutorial in the database
  Courses.create(course)
    .then((data) => {
      res.status(201).send({results: data})
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

  Courses.findAll()
    .then((data) => {
      if (data.length === 0) {
        res.send({ results: "No Courses exist on the list. You should add some." });
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

  Courses.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({results: data});
      } else {
        res.status(404).send({
          results: `Cannot find Department with the given id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Courses.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          results: "Course info was updated successfully.",
        });
      } else {
        res.send({
          results: `Cannot update Course info with id=${id}. Maybe Course was not found in database or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error updating Course with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Courses.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          results: "Course was deleted from database successfully!",
        });
      } else {
        res.send({
          results: `Cannot delete Course with id=${id}. Maybe Course was not found in database!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Could not delete School with id=" + id,
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
  Courses.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ results: `${nums} Courses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message
      });
    });
};

// Find all published Departments
exports.findAllActive = (req, res) => {
  Courses.findAll({ where: { active: true } })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({ message: "No Active Courses were found." });
      }
      res.status(200).send({results: data});
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message
      });
    });
};
exports.findAllInActive = (req, res) => {
  Courses.findAll({ where: { active: false } })
    .then((data) => {
      if (data.length === 0) {
        res.send({ results: "No inactive Courses were found!" });
      }
      res.status(200).send({results: data});
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message
      });
    });
};
