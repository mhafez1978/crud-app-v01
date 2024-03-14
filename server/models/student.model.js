module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("students", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  });
  

  return Student;
};
