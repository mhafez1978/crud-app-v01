const db = require("../models");
const Teachers = db.teachers;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.firstName || !req.body.lastName || !req.body.active) {
  //   res.status(400).send({
  //     message: "Please fill all required fields cannot be empty!",
  //   });
  //   return;
  // }

  // Create a Tutorial
  const teacher = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    active: req.body.active,
  };

  if (
    teacher.firstName.length === 0 ||
    teacher.lastName.length === 0 
  ) {
    return res.status(404).send({ validation: "fields cannot be empty..." });
  }

  // Save Tutorial in the database
  Teachers.create(teacher)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({
        error:
          err.message
      });
    });
};

// Retrieve all Schools from the database.
exports.findAll = (req, res) => {
  //const name = req.query.name;
  //var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Teachers.findAll()
    .then((data) => {
      if (!data) {
        res.status(404).send({ results: "No Teachers exist to list." });
      }
      
      res.status(200).send(data);
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

  Teachers.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          results: `Cannot find Teacher with the given id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Teachers.update(req.body, {
    where: { id: id },
  })
    .then((data) => {
      if (data) {
        res.status(203).send({
          results: "Teacher info was updated successfully.",
        });
      } else {
        res.status(404).send({
          results: `Cannot find Teacher with given id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error updating Teacher with id=" + id,
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
          results: "Teacher was deleted from database successfully!",
        });
      } else {
        res.send({
          results: `Cannot delete Teacher with id=${id}. Maybe School was not found in database!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Could not delete Teacher with id=" + id,
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
      res.send({ results: `${nums} Teachers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message
      });
    });
};

// Find all published Teachers
exports.findAllActive = (req, res) => {
  Teachers.findAll({ where: { active: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message
      });
    });
};
exports.findAllInActive = (req, res) => {
  Teachers.findAll({ where: { active: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error:
          err.message
      });
    });
};
