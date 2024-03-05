const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.schools = require("./school.model.js")(sequelize, Sequelize);
db.teachers = require("./teacher.model.js")(sequelize, Sequelize);
db.departments = require("./department.model.js")(sequelize, Sequelize);
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);

const setupAssociations = (sequelize) => {
  
  db.schools.hasMany(db.teachers, {
    as: "Teachers",
    foreignKey: "teacherId",
    onDelete: "CASCADE", // Enabling cascading deletes
  });

  db.teachers.belongsTo(db.schools, {
    as: "School",
    foreignKey: "schoolId",
  });
 

  db.schools.hasMany(db.departments, {
    as: "Departments",
    foreignKey: "departmentId",
    onDelete: "CASCADE", // Enabling cascading deletes
  });

  db.departments.belongsTo(db.schools, {
    as: "School",
    forginKey: "schoolId"
  });

  db.departments.hasMany(db.courses, {
    as: "Courses",
    forignKey: "courseId",
    onDelete: "CASCADE"
  });

   db.schools.hasMany(db.students, {
     as: "Student",
     foreignKey: "studentId",
     onDelete: "CASCADE", // Enabling cascading deletes
   });

   db.students.belongsTo(db.schools, {
     as: "School",
     foreignKey: "schoolId",
   });

};

setupAssociations();
module.exports = db;
