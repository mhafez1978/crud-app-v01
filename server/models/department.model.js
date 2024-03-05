module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("departments", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Department;
};
