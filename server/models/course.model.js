const { BOOLEAN, DATE } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("courses", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE(6),
      
    },
    endDate: {
      type: Sequelize.DATE(6),
      
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    },
  });

  return Course;
};
