module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define(
    "teachers",
    {
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
    },
  );

  return Teacher;
};
