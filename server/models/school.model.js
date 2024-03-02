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
    {
      // add associations to other models here ...
      // like for example
      // each single school will have many teachers, students, parents, and admin staff.
      // so should be one to many relation to each of the above models.
      // look into on cascade switch or parameter when deleting ...
    }
  );

  return School;
};
