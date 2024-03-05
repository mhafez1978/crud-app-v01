// /api/students: GET, POST, DELETE
// /api/students/:id: GET, PUT, DELETE
// /api/students/published: GET

module.exports = (app) => {
  const students = require("../controller/student.controller");

  var router = require("express").Router();

  /**
   * @swagger
   * components:
   *  schemas:
   *    Student:
   *      type: object
   *      properties:
   *        firstName:
   *          type: string
   *          description: first name
   *        lastName:
   *          type: string
   *          description: last name
   *        active:
   *          type: boolean
   *          description: Teacher active status either true or false..
   *      required:
   *        - firstName
   *        - lastName
   *        - active
   *      example:
   *        firstName: John
   *        lastName: Doe
   *        active: false
   *
   */

  /**
   * @swagger
   *  tags:
   *    name: Students
   *    description: The Student API EndPoints.
   */

  /**
   * @swagger
   * /api/students/create:
   *  post:
   *      summary: Admin can add a new Student using this EndPoint.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to create a new Student entry in students table in the database.
   *      requestBody:
   *         description: Contains student's info to be created in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                firstName:
   *                 type: string
   *                lastName:
   *                  type: string
   *                active:
   *                  type: boolean
   *              required:
   *                - firstName
   *                - lastName
   *                - active
   *              example:
   *                firstName: John
   *                lastName: Doe
   *                active: false
   *      responses:
   *       '201':
   *          description: Will return results of created Student.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Student'
   *
   */
  router.post("/create", students.create);

  /**
   * @swagger
   * /api/students/list:
   *  get:
   *      summary: Admin can get an array list of all students.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to get an array of all the students in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all students in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Student'
   *                example:
   *                  firstName: Mike
   *                  lastName: Jones
   *                  active: false
   *
   *
   */
  router.get("/list", students.findAll);

  /**
   * @swagger
   * /api/students/list/active:
   *  get:
   *      summary: Admin can get an array list of all students with active status.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to get an array of all the active Students in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all active Students in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Student'
   *
   *
   */
  router.get("/list/active", students.findAllActive);

  /**
   * @swagger
   * /api/students/list/inactive:
   *  get:
   *      summary: Admin can get an array list of all Students with inactive status.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to get an array of all the inactive Students in database.
   *      responses:
   *       '200':
   *          description: Will show array results of all inactive Students in database.
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Student'
   *
   */
  router.get("/list/inactive", students.findAllInActive);

  /**
   * @swagger
   * /api/students/find/{id}:
   *  get:
   *      summary: Admin can get teacher by id
   *      tags: [Students]
   *      description: This EndPoint will allow admin to get Student by id.
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the StudentId you want to find in database.
   *      responses:
   *       '200':
   *          description: Will show Student by StudentId if one is found found.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Student'
   *       '404':
   *          description: Could not find Student with the provided StudentId.
   *
   */
  router.get("/find/:id", students.findOne);

  /**
   * @swagger
   * /api/students/update/{id}:
   *  put:
   *      summary: Admin can put or update a Student by StudentId.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to make a put http request to update a Student by StudentId
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the StudentId you want to find and then update the Student details in database.
   *      requestBody:
   *         description: Contains Student info to be updated in request body
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                firstName:
   *                 type: string
   *                lastName:
   *                  type: string
   *                active:
   *                  type: boolean
   *              required:
   *                - firstName
   *                - lastName
   *                - active
   *              example:
   *                firstName: Mike
   *                lastName: Jones
   *                active: false
   *      responses:
   *       '201':
   *          description: Will show update success message
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Student'
   *       '404':
   *          description: Could not update this teacher
   *
   */
  router.put("/update/:id", students.update);

  /**
   * @swagger
   * /api/students/delete/{id}:
   *  delete:
   *      summary: Admin can delete a Student by StudentId.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to delete a Student by StudentId.
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: This is the StudentId you want to delete in database.
   *      responses:
   *       '200':
   *          description: Success message Student was deleted.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Student'
   *       '404':
   *          description: Could not find Student with the provided StudentId to delete.
   *
   */
  router.delete("/delete/:id", students.delete);

  /**
   * @swagger
   * /api/students/delete-all:
   *  delete:
   *      summary: Admin can delete all Student.
   *      tags: [Students]
   *      description: This EndPoint will allow admin to delete all Student.
   *      responses:
   *       '200':
   *          description: Success message all Student were deleted ok.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Student'
   *       '404':
   *          description: Could not delete all the Students from the database.
   *
   */
  router.delete("/delete-all", students.deleteAll);

  app.use("/api/students", router);
};
