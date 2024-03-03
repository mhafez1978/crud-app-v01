const Teacher = require("./teacher.model");

module.exports = (sequelize, Sequelize) => {
  const School = sequelize.define(
    "schools",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
    },
  );

  return School;
};


